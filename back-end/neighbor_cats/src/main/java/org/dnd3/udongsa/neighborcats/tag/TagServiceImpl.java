package org.dnd3.udongsa.neighborcats.tag;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

  private final TagRepository repo;

  @Override
  public List<Tag> findAll(List<Long> tagIds) {
    return repo.findAllById(tagIds);
  }

  
}