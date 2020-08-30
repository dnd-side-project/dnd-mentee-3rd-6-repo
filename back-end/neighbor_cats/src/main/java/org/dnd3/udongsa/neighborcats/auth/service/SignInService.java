package org.dnd3.udongsa.neighborcats.auth.service;

import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;

public interface SignInService {

  SignInResDto signIn(SignInReqDto reqDto);
  
}