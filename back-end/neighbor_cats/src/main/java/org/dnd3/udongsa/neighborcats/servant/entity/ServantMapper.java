package org.dnd3.udongsa.neighborcats.servant.entity;

import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpReqDto;

public class ServantMapper {
  
  public Servant map(SignUpReqDto reqDto) {
    Servant servant = new Servant(  reqDto.getName(), 
                                    reqDto.getEmail(), 
                                    reqDto.getPassword(), 
                                    reqDto.getPhoneNumber(),
                                    reqDto.getIsServant());
    return servant;
  }

}