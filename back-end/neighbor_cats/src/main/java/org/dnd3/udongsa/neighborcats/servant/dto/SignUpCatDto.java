package org.dnd3.udongsa.neighborcats.servant.dto;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.cat.EGender;

import lombok.Data;

@Data
public class SignUpCatDto {
  private String name;
  private String features;
  private Long kindId;
  private EGender gender;
  private LocalDate birthday;
}
