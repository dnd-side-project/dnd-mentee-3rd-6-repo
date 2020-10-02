package org.dnd3.udongsa.neighborcats.cat.entity;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class CatTestBuilder {

  public static Cat build(String name, Servant servant){
    CatKind catKind = CatKind.of("페르시안");
    LocalDate catBirthDay = LocalDate.of(2020, 1, 2);
    Cat cat = Cat.of(
      name,
      "잠이많음",
      catKind,
      EGender.MALE,
      catBirthDay,
      ENeutralized.FALSE,
      1.5d,
      servant);
    cat.attachProfileImg(ImgFile.of("filepath", "filename", "ext"));
    return cat;
  }

  public static CatDto build(Long id, String name){
    return new CatDto(
      id,
      name,
      "잠만잠",
      CatKind.of("페르시안"),
      EGender.FEMALE,
      LocalDate.of(2020,1,2),
      ENeutralized.NONE,
      3.2D,
      "https://woodongjip.com/imgfiels/1");
  }
  
}