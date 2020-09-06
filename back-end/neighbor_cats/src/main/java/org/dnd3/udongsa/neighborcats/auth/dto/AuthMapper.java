package org.dnd3.udongsa.neighborcats.auth.dto;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class AuthMapper {

  public static SignUpResDto map(Servant servant, String accessToken, String servantProfileImgUrl) {
    SignUpResDto res = new SignUpResDto(accessToken, 
      servant.getId(), 
      servant.getName(), 
      servant.getEmail(), 
      servant.getNickname(), 
      servant.getAddress().getName(), 
      servant.getPhoneNumber(), 
      servantProfileImgUrl, 
      servant.getIsServant(), 
      servant.getRoles());
    return res;
  }
  
}