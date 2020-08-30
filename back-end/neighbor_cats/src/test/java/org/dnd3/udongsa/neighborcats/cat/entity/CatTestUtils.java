package org.dnd3.udongsa.neighborcats.cat.entity;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class CatTestUtils {

  public static Cat generateDefault(Servant servant){
    CatKind catKind = CatKind.of("페르시안");
    LocalDate catBirthDay = LocalDate.of(2020, 01, 02);
    Cat cat = Cat.of("연탄", "잠이많음", catKind, EGender.MALE, catBirthDay, ENeutralized.FALSE, 1.5d, servant);
    return cat;
  }
  
}