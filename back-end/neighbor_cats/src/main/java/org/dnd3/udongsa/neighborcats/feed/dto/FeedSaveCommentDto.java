package org.dnd3.udongsa.neighborcats.feed.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class FeedSaveCommentDto {

  @NotBlank
  private Long feedId;
  
  @NotBlank
  private String content;
  
}
