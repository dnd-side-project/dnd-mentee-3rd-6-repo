package org.dnd3.udongsa.neighborcats.cat.dto;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;

import lombok.Data;

@Data
public class CatDto {

  private Long id;
  private String name;
  private String features;
  private String kindName;
  private EGender gender;
  private LocalDate birthday;
  private ENeutralized neutralized;
  private Double weight;
  private String profileImgUrl;
  
}