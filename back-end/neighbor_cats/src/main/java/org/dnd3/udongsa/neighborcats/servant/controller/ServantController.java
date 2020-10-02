package org.dnd3.udongsa.neighborcats.servant.controller;

import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/servants")
public class ServantController {

  private final ServantService service;

  @GetMapping("/me")
  public ServantDto getMe(){
    return service.getMe();
  }
  
}