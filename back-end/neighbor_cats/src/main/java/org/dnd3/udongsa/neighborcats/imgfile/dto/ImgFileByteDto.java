package org.dnd3.udongsa.neighborcats.imgfile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ImgFileByteDto {

  private String fileName;
  private byte[] bytes;
  
}