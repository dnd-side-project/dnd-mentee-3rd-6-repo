package org.dnd3.udongsa.neighborcats.cat.entity;

import java.util.Objects;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class CatMapper {

  public static Cat map(SignUpReqDto dto, CatKind kind, Servant servant){
    Cat cat = new Cat();
    cat.signUp(dto.getName(), dto.getCatFeatures(), kind, dto.getCatGender(), dto.getCatBirthday(), dto.getCatNeutralized(),servant);
    return cat;
  }

  public static CatDto map(Cat cat, String profileImgUrl){
    CatDto dto = new CatDto();
    dto.setId(cat.getId());
    dto.setName(cat.getName());
    dto.setFeatures(cat.getFeatures());
    if(Objects.isNull(cat.getKind())){
      dto.setKindName(null);
    }else{
      dto.setKindName(cat.getKind().getName());
    }
    dto.setGender(cat.getGender());
    dto.setBirthday(cat.getBirthday());
    dto.setNeutralized(cat.getNeutralized());
    dto.setProfileImgUrl(profileImgUrl);
    return dto;
  }

  public static CatDto map(Cat cat){
    CatDto dto = new CatDto();
    dto.setId(cat.getId());
    dto.setName(cat.getName());
    dto.setFeatures(cat.getFeatures());
    if(Objects.isNull(cat.getKind())){
      dto.setKindName(null);
    }else{
      dto.setKindName(cat.getKind().getName());
    }
    dto.setGender(cat.getGender());
    dto.setBirthday(cat.getBirthday());
    dto.setNeutralized(cat.getNeutralized());
    return dto;
  }
  
}