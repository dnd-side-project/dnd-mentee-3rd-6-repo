package org.dnd3.udongsa.neighborcats.catkind.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.catkind.CatKindDto;
import org.springframework.data.domain.Sort;

public interface CatKindService {

  List<CatKindDto> getAll(Sort sort);
  
}