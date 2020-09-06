package org.dnd3.udongsa.neighborcats.auth.service;

import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;

public interface AuthService {

  SignResDto signUp(SignUpReqDto reqDto);
  Boolean isExistEmail(String email);
  SignResDto signIn(SignInReqDto reqDto);
  Boolean isExistNickname(String nickname);
  
}