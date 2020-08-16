package org.dnd3.udongsa.neighborcats.imgfile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ImgFileDto {

  private String fileName;
  private byte[] bytes;
  
}