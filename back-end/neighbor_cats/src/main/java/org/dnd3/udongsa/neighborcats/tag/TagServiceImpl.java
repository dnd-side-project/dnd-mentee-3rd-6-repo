package org.dnd3.udongsa.neighborcats.tag;

import java.util.List;
import java.util.stream.Collectors;

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

  @Override
  public List<TagDto> getAll() {
    return repo.findAll().stream().map(tag->new TagDto(tag.getId(), tag.getName())).collect(Collectors.toList());
  }

}