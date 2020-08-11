package org.dnd3.udongsa.neighborcats.phnumauth.dto;

import lombok.Data;

@Data
public class SendCodeResDto {

    private String phoneNumber;
    private Integer expireTime;
    
}