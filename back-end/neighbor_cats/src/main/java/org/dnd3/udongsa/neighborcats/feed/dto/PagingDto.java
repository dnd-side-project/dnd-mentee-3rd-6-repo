package org.dnd3.udongsa.neighborcats.feed.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PagingDto<T> {

  private int pageNumber;
  private int pageSize;
  private int totalPages;
  @JsonProperty("isLast")
  private boolean isLast;
  @JsonProperty("isFirst")
  private boolean isFirst;
  private List<T> contents = new ArrayList<>();
  
}