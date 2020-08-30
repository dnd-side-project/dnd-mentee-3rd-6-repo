package org.dnd3.udongsa.neighborcats.servant.entity;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.role.Role;

public class ServantMapper {
  
  public static Servant map(SignUpReqDto dto, Role role, String encodedPassword, Address address) {
    Servant servant = Servant.of(  
      dto.getName(), 
      dto.getEmail(), 
      encodedPassword, 
      dto.getPhoneNumber(),
      dto.getIsServant(),
      dto.getNickName(),
      role,
      address
    );
    return servant;
  }

}