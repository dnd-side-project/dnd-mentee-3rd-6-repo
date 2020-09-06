package org.dnd3.udongsa.neighborcats.servant.dto;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.cat.entity.EGender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class SignUpCatResDto {

  private Long id;

  private String name;
  
  // 특징
  private String features;

  // 품종
  private String kindName;

  private EGender gender;
  
  private LocalDate birthday;

  private Long imgfileId;
  
}