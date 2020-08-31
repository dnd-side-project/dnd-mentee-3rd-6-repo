package org.dnd3.udongsa.neighborcats.feed.dto;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class FeedDto {
  
  private Long id = 0L;
  private String content = "";
  private List<FeedTagDto> feedTags = new ArrayList<>(); 
  private List<ImgFileDto> images = new ArrayList<>();
  private AuthorDto author = new AuthorDto();
  private List<FeedCommentDto> comments = new ArrayList<>(); 
  private Boolean isLike = false;
  private long numberOfLikes = 0L;
  private int numberOfComments = 0;
  private String createdDateTime;
  private String timeDesc = "0분전";

}