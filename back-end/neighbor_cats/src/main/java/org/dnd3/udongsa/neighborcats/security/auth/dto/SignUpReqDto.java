package org.dnd3.udongsa.neighborcats.security.auth.dto;

import lombok.Data;

@Data
public class SignUpReqDto {

    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private Boolean isServant;

}