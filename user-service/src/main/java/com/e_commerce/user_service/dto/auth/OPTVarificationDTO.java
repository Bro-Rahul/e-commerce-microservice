package com.e_commerce.user_service.dto.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;


@Data
public class OPTVarificationDTO {
    @NotNull
    private String otpCode;

    @NotNull
    @PositiveOrZero
    private int userId;
}
