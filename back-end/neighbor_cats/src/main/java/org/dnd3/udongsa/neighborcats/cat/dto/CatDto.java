package org.dnd3.udongsa.neighborcats.cat.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;

import lombok.Data;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;

@Data @AllArgsConstructor @NoArgsConstructor
public class CatDto {

  private Long id;
  private String name;
  private String features;
  private CatKind kind;
  private EGender gender;
  private LocalDate birthday;
  private ENeutralized neutralized;
  private Double weight;
  private String profileImgUrl;
  
}