package org.dnd3.udongsa.neighborcats.feed.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class FeedLikeDto {

  @JsonAlias("isLike")
  Boolean isLike = false;

}
