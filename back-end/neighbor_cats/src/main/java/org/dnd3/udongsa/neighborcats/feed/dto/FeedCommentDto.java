package org.dnd3.udongsa.neighborcats.feed.dto;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class FeedCommentDto {
  
  private Long id = 0L;
  private String content = "";
  private Long numberOfLikes = 0L;
  private List<ReplyDto> replies = new ArrayList<>();
  private int numberOfReplies = 0;
  private Boolean isLike = false;
  private String createdDateTime;
  private String timeDesc;
  private AuthorDto author = new AuthorDto();
}