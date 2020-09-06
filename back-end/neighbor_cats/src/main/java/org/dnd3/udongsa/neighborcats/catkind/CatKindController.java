package org.dnd3.udongsa.neighborcats.catkind;

import java.util.List;

import org.dnd3.udongsa.neighborcats.catkind.service.CatKindService;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cat-kinds")
public class CatKindController {
  
  private final CatKindService service;

  @GetMapping("")
  public List<CatKindDto> getAll(@SortDefault(value="name", direction=Direction.ASC) Sort sort){
    return service.getAll(sort);
  }

}