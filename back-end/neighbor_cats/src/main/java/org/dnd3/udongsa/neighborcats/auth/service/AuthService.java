package org.dnd3.udongsa.neighborcats.auth.service;

import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;

public interface AuthService {

  SignUpResDto signUp(SignUpReqDto reqDto);
  Boolean isExistEmail(String email);
  SignInResDto signIn(SignInReqDto reqDto);
  Boolean isExistNickname(String nickname);
  
}