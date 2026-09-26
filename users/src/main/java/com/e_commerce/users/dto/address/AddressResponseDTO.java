package com.e_commerce.users.dto.address;

import lombok.Data;

@Data
public class AddressResponseDTO {

    private String id;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String country;
    private String postalCode;
}