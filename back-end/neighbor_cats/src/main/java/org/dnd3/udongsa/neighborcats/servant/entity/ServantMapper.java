package org.dnd3.udongsa.neighborcats.servant.entity;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.role.Role;

public class ServantMapper {
  
  public static Servant map(SignUpReqDto dto, Role role) {
    Servant servant = new Servant(  
      dto.getName(), 
      dto.getEmail(), 
      dto.getPassword(), 
      dto.getPhoneNumber(),
      dto.getIsServant(),
      dto.getNickName(),
      dto.getAddress()
    );
    servant.addRole(role);
    return servant;
  }

}