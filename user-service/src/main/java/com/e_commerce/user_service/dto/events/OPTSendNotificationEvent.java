package com.e_commerce.user_service.dto.events;

import com.e_commerce.user_service.dto.common.EmailDetailDTO;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OPTSendNotificationEvent {
    @NotNull
    private EmailDetailDTO emailDetail;

    @NotNull
    private String opt;
}
