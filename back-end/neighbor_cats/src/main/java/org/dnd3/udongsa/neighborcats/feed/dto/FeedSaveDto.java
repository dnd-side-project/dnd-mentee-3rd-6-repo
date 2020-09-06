package org.dnd3.udongsa.neighborcats.feed.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class FeedSaveDto {
  
  private String content;
  private List<MultipartFile> imgFiles;
  private Long tagId;
  private List<Long> catIds;
  
}