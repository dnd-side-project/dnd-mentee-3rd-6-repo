package org.dnd3.udongsa.neighborcats.feed.dto;

import java.util.ArrayList;
import java.util.List;

public class PagingDto {

  private int pageNumber;
  private int pageSize;
  private int totalPages;
  private boolean isLast;
  private boolean isFirst;
  private List<Object> contents = new ArrayList<>();
  
}