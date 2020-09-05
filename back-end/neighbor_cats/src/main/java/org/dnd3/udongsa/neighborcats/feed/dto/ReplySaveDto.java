package org.dnd3.udongsa.neighborcats.feed.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ReplySaveDto {

  private Long commentId;
  private String content;
  
}
