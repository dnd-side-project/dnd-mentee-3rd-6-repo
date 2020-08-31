package org.dnd3.udongsa.neighborcats.servant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class AuthorDto {
  
  private Long id = 0L;
  private String nickName = "";
  private String profileImg = "";
  private String addressName = "";
  
}