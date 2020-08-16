package org.dnd3.udongsa.neighborcats.servant.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProfileUploadDto {

  private MultipartFile imgFile;

}
