package org.dnd3.udongsa.neighborcats.feed.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ReplyDto {
  
  private Long id = 0L;
  private String content = "";
  private int numberOfLikes = 0;
  @JsonAlias("isLike")
  private boolean isLike = false;
  private String createdDateTime = "";
  private String timeDesc = "";
  private AuthorDto author = new AuthorDto();
  
}