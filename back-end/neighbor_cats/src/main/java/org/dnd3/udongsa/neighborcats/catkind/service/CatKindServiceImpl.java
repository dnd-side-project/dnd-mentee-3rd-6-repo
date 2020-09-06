package org.dnd3.udongsa.neighborcats.catkind.service;

import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.catkind.CatKindDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKindRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CatKindServiceImpl implements CatKindService {

  private final CatKindRepository catKindRepo;

  @Override
  public List<CatKindDto> getAll(Sort sort) {
    return catKindRepo.findAll(sort).stream()
    .map(catKind->new CatKindDto(catKind.getId(), catKind.getName()))
    .collect(Collectors.toList());
  }
  
}