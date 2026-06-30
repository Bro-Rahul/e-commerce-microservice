package com.e_commerce.user_service.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetailDTO {

    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
    private int userId;
}