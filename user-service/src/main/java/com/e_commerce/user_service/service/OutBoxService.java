package com.e_commerce.user_service.service;

import com.e_commerce.user_service.dto.common.EmailDetailDTO;
import com.e_commerce.user_service.dto.events.OPTSendNotificationEvent;
import com.e_commerce.user_service.model.OutBox;
import com.e_commerce.user_service.model.OutBoxStatus;
import com.e_commerce.user_service.model.Users;
import com.e_commerce.user_service.rabbitMQ.producer.EmailVerificationProducer;
import com.e_commerce.user_service.repo.OutBoxRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OutBoxService {

    private final OutBoxRepo outBoxRepo;
    private final EmailVerificationProducer emailVerificationProducer;

    @Transactional
    public void emailVarificationEvent(Users user){
        OutBox outBox = new OutBox();
        String otp = new SecureRandom()
                .ints(6, 0, 10)
                .mapToObj(String::valueOf)
                .collect(Collectors.joining());

        OPTSendNotificationEvent emailVerificationEvent = new OPTSendNotificationEvent();
        EmailDetailDTO emailDetailDTO = new EmailDetailDTO();
        emailDetailDTO.setRecipient(user.getEmail());
        emailDetailDTO.setSubject("Email Verification");
        emailDetailDTO.setMsgBody("Your OTP for email verification is ");
        emailVerificationEvent.setOpt(otp);
        emailDetailDTO.setUserId(user.getId());
        emailVerificationEvent.setEmailDetail(emailDetailDTO);
        outBox.setPayload(emailVerificationEvent);
        outBoxRepo.save(outBox);
    }

    @Transactional
    public void sendPendingOutBoxRequests(){
        List<OutBox> outBoxList = outBoxRepo.findByStatus(OutBoxStatus.PENDING);
        for(OutBox outBox : outBoxList){
            emailVerificationProducer.sendEmailVerificationRequest(outBox);
            outBox.setStatus(OutBoxStatus.SEND);
            outBoxRepo.save(outBox);
        }
    }
}
