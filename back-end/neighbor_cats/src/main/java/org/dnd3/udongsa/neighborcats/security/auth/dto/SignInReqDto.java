package org.dnd3.udongsa.neighborcats.security.auth.dto;

import lombok.Data;

@Data
public class SignInReqDto {

  private String email;
  private String password;
  
}