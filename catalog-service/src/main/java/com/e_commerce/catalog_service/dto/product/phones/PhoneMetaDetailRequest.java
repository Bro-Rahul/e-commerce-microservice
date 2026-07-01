package com.e_commerce.catalog_service.dto.product.phones;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PhoneMetaDetailRequest {

    @NotBlank(message = "Brand must not left blank")
    @Size(min = 3, max = 50, message = "Brand must contain 3 to 50 characters ")
    private String brand;

    @NotBlank(message = "Operating System must not left blank")
    @Size(min = 3, max = 50, message = "Operating System must contain 3 to 50 characters ")
    private String operatingSystem;

    @NotBlank(message = "Ram must not left blank")
    @Size(min = 3, max = 50, message = "Ram must contain 3 to 50 characters ")
    private String ram;

    @NotBlank(message = "Cpu Model must not left blank")
    @Size(min = 3, max = 50, message = "Cpu Model must contain 3 to 50 characters ")
    private String cpuModel;

    @NotBlank(message = "Cpu Speed must not left blank")
    @Size(min = 3, max = 50, message = "Cpu Speed must contain 3 to 50 characters ")
    private String cpuSpeed;

}
