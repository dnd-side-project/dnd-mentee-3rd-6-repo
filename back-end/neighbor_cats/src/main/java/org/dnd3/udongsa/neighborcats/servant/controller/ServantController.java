package org.dnd3.udongsa.neighborcats.servant.controller;

import java.security.Principal;
import java.util.List;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ServantController {

  private final ServantRepository repo;

  @GetMapping("/api/servants")
  public List<Servant> getAll(Principal principal){
    return repo.findAll();
  }
  
}