package org.dnd3.udongsa.neighborcats.catkind;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/catkinds")
public class CatKindController {
  
  private final CatKindRepository repo;

  @GetMapping("")
  public List<CatKindDto> getAll(@SortDefault("name,asc") Sort sort){
    return repo.findAll(sort).stream()
          .map(catKind->new CatKindDto(catKind.getId(), catKind.getName()))
          .collect(Collectors.toList());
  }

}