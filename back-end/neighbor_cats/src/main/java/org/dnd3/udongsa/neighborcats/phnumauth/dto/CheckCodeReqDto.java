package org.dnd3.udongsa.neighborcats.phnumauth.dto;

import lombok.Data;

@Data
public class CheckCodeReqDto {

    private String phoneNumber;
    private Integer verificationCode;    
}
