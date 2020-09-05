package org.dnd3.udongsa.neighborcats.keep;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class KeepDto {
  
  @JsonAlias("isKeep")
  private Boolean isKeep;

}
