package org.dnd3.udongsa.neighborcats.security.auth;

import org.dnd3.udongsa.neighborcats.security.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpResDto;

public interface AuthService {

  SignUpResDto signUp(SignUpReqDto reqDto);
  SignInResDto signIn(SignInReqDto reqDto);
  
}