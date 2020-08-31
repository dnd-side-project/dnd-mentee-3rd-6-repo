package org.dnd3.udongsa.neighborcats.imgfile.controller;

import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileUrlDto;
import org.dnd3.udongsa.neighborcats.imgfile.service.BasicImgFileService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/base-img-files")
@RequiredArgsConstructor
public class BasicImgFileController {
  
  private final BasicImgFileService service;

  @Secured("ROLE_ADMIN")
  @PostMapping("/servant")
  public ImgFileUrlDto saveServantBasicImg(MultipartFile baseImgFile){

    return service.uploadServant(baseImgFile);

  }

}