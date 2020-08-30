package org.dnd3.udongsa.neighborcats.servant.entity;

import java.util.List;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.auth.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.role.Role;

public class ServantMapper {
  
  public static Servant map(SignUpReqDto dto, Role role, String encodedPassword, Address address, ImgFile profileImg) {
    Servant servant = Servant.of(  
      dto.getName(), 
      dto.getEmail(), 
      encodedPassword, 
      dto.getPhoneNumber(),
      dto.getIsServant(),
      dto.getNickName(),
      role,
      address,
      profileImg
    );
    return servant;
  }

  public static ServantDto map(Servant servant, String profileImgUrl, List<CatDto> cats){
    ServantDto servantDto = new ServantDto(servant.getId(), 
      servant.getName(), 
      servant.getEmail(), 
      servant.getNickname(), 
      servant.getAddress().getName(), 
      servant.getPhoneNumber(), 
      profileImgUrl, 
      servant.getIsServant(), 
      servant.getRoles(), 
      cats);
    return servantDto;
  }

}