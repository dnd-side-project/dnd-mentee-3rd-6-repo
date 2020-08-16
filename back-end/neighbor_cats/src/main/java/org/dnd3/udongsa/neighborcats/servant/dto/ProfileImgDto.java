package org.dnd3.udongsa.neighborcats.servant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ProfileImgDto {

  private Long servantId;
  private Long catId;
  private Long imgFileId;
  
}