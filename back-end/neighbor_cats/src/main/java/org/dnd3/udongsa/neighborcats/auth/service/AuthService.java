package org.dnd3.udongsa.neighborcats.auth.service;

import org.dnd3.udongsa.neighborcats.auth.dto.MeInfo;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.TokenDto;

public interface AuthService {

  TokenDto signUp(SignUpReqDto reqDto);
  TokenDto signIn(SignInReqDto reqDto);
  Boolean isExistEmail(String email);
  Boolean isExistNickname(String nickname);
  MeInfo getMe();
  
}