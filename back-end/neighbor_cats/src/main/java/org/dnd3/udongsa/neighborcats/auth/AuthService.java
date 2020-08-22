package org.dnd3.udongsa.neighborcats.auth;

import org.dnd3.udongsa.neighborcats.auth.dto.CatProfileUploadResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.LoggedServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;

public interface AuthService {

  SignUpResDto signUp(SignUpReqDto reqDto);
  SignInResDto signIn(SignInReqDto reqDto);
  CatProfileUploadResDto signUpCatProfileImg(byte[] imgBytes);
  LoggedServantDto getLoggedServant();
  Boolean isExistEmail(String email);
  
}