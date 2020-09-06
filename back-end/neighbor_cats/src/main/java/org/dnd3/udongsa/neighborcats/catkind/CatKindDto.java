package org.dnd3.udongsa.neighborcats.catkind;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor
public class CatKindDto {
  private Long id;
  private String name;
}