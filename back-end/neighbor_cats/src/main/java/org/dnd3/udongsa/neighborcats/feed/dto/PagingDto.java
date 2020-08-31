package org.dnd3.udongsa.neighborcats.feed.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class PagingDto<T> {

  private int pageNumber;
  private int pageSize;
  private int totalPages;
  private boolean isLast;
  private boolean isFirst;
  private List<T> contents = new ArrayList<>();
  
}