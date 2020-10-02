package org.dnd3.udongsa.neighborcats.cat.entity;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CatMapper {

  private final ModelMapper modelMapper;

  public CatMapper(){
    modelMapper = new ModelMapper();
  }

  public static Cat map(SignUpReqDto dto, CatKind kind, Servant servant){
    LocalDate birthday = LocalDate.parse(dto.getCatBirthday(), DateTimeFormatter.ISO_LOCAL_DATE);
    return Cat.of(dto.getCatName(), dto.getCatFeatures(), kind, dto.getCatGender(), birthday, dto.getCatNeutralized(), dto.getCatWeight(), servant);
  }

  public CatDto map(Cat cat){
    CatDto dto = new CatDto();
    modelMapper.map(cat, dto);
    dto.setProfileImgUrl(ImgFileUtils.generateImgFileUrl(cat.getProfileImg()));
    return dto;
  }

}