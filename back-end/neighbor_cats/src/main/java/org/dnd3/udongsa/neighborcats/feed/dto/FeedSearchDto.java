package org.dnd3.udongsa.neighborcats.feed.dto;

import org.dnd3.udongsa.neighborcats.feed.entity.EFilterType;
import org.dnd3.udongsa.neighborcats.feed.entity.ESortType;

import lombok.Data;

@Data
public class FeedSearchDto {

  private int tagId;
  private EFilterType filterType;
  private ESortType sortType;
  private int catId;
  private int pageNumber;
  private int pageSize;
  
}