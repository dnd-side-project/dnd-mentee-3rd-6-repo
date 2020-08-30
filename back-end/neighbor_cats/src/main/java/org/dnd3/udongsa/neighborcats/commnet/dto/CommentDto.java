package org.dnd3.udongsa.neighborcats.commnet.dto;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.reply.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class CommentDto {
  
  private Long id = 0L;
  private String content = "";
  private int numberOfLikes = 0;
  private int numberOfReplies = 0;
  private Boolean isLike = false;
  private String createdDateTime;
  private String timeDesc;
  private AuthorDto author = new AuthorDto();
  private List<ReplyDto> replies = new ArrayList<>();
}