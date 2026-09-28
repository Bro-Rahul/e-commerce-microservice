package com.e_commerce.users.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SellerProfileDTO {

    @NotEmpty
    private String storeName;

    @NotEmpty
    private String storeDescription;

    @NotEmpty
    private String businessName;

    @NotEmpty
    @Email
    private String businessEmail;

    @NotEmpty
    private String businessPhone;

    @NotEmpty
    private String gstNumber;

    @NotEmpty
    private String logoUrl;

    @NotEmpty
    private String accountNumber;

    @NotEmpty
    private String ifscCode;

}
