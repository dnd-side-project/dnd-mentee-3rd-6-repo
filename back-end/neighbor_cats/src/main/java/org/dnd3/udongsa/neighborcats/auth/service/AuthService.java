package org.dnd3.udongsa.neighborcats.auth.service;

import org.dnd3.udongsa.neighborcats.auth.dto.LoggedServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;

public interface AuthService {

  SignUpResDto signUp(SignUpReqDto reqDto);
  LoggedServantDto getLoggedServant();
  Boolean isExistEmail(String email);
  
}