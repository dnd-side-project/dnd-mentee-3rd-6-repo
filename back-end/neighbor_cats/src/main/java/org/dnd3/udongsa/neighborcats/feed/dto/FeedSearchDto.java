package org.dnd3.udongsa.neighborcats.feed.dto;

import org.dnd3.udongsa.neighborcats.feed.entity.EFilterType;
import org.dnd3.udongsa.neighborcats.feed.entity.ESortType;

import lombok.Data;

@Data
public class FeedSearchDto {

  private Long tagId;
  private EFilterType filterType;
  private ESortType sortType;
  private Long catId;
  private Integer pageNumber;
  private Integer pageSize;
  
}