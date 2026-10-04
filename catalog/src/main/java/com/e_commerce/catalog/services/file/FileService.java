package com.e_commerce.catalog.services.file;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    private final Path uploadDirectory;

    public FileService(@Value("${app.upload-dir:upload}") String uploadDirectory) {
        this.uploadDirectory = Path.of(uploadDirectory).toAbsolutePath().normalize();
    }

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An uploaded file must not be empty");
        }
        String extension = getSafeExtension(file.getOriginalFilename());
        String storedFileName = UUID.randomUUID() + extension;
        Path destination = uploadDirectory.resolve(storedFileName);

        try {
            Files.createDirectories(uploadDirectory);
            try (var inputStream = file.getInputStream()) {
                Files.copy(inputStream, destination);
            }
        } catch (IOException exception) {
            try {
                Files.deleteIfExists(destination);
            } catch (IOException cleanupException) {
                logger.warn("Unable to remove partially stored upload: {}", destination, cleanupException);
            }
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to store uploaded file",
                    exception);
        }

        return "/uploads/" + storedFileName;
    }

    public List<String> storeAll(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return List.of();
        }

        List<String> storedFiles = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                if (file != null && !file.isEmpty()) {
                    storedFiles.add(store(file));
                }
            }
        } catch (RuntimeException exception) {
            deleteAll(storedFiles);
            throw exception;
        }
        return storedFiles;
    }

    public void deleteAll(List<String> fileUrls) {
        for (String fileUrl : fileUrls) {
            delete(fileUrl);
        }
    }

    public void delete(String fileUrl) {
        Path file = uploadDirectory.resolve(Path.of(fileUrl).getFileName()).normalize();
        if (!file.startsWith(uploadDirectory)) {
            return;
        }
        try {
            Files.deleteIfExists(file);
        } catch (IOException exception) {
            logger.warn("Unable to remove uploaded file during cleanup: {}", file, exception);
        }
    }

    private String getSafeExtension(String originalFilename) {
        if (originalFilename == null) {
            return "";
        }
        String fileName = originalFilename.replace('\\', '/');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        int extensionStart = fileName.lastIndexOf('.');
        if (extensionStart < 0) {
            return "";
        }

        String extension = fileName.substring(extensionStart);
        return extension.matches("\\.[a-zA-Z0-9]{1,10}") ? extension : "";
    }
}
