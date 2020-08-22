package org.dnd3.udongsa.neighborcats.cat.entity;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class CatMapper {

  public static Cat map(SignUpReqDto dto, CatKind kind, Servant servant){
    Cat cat = new Cat();
    cat.signUp(dto.getName(), dto.getCatFeatures(), kind, dto.getGender(), dto.getCatBirthday(), dto.getCatNeutralized(),servant);
    return cat;
  }
  
}