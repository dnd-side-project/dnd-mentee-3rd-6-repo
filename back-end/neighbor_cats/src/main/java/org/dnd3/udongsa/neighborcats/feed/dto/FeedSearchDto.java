package org.dnd3.udongsa.neighborcats.feed.dto;

import lombok.Data;

@Data
public class FeedSearchDto {

  private int feedTagId;
  private int filterTypeId;
  private int sortTypeId;
  private int catTagId;
  private int pageNumber;
  private int pageSize;
  
}