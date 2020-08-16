package org.dnd3.udongsa.neighborcats.imgfile.controller;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/imgfiles")
@RequiredArgsConstructor
public class ImgFileController {

  private final ImgFileService service;
  
  @GetMapping("/{id}")
  public ResponseEntity<byte[]> getImg(@PathVariable Long id){
    ImgFileDto imgFile = service.findById(id);

    HttpHeaders headers = new HttpHeaders();
    headers.set(HttpHeaders.CONTENT_TYPE, "image/jpeg");
    return ResponseEntity.ok().headers(headers).body(imgFile.getBytes());
  }
}