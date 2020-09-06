package org.dnd3.udongsa.neighborcats.auth.dto;

import lombok.Data;

@Data
public class SignInReqDto {

  private String email;
  private String password;
  
}