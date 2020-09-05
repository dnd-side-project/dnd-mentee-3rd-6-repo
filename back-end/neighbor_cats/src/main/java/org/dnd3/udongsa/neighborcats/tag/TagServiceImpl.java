package org.dnd3.udongsa.neighborcats.tag;

import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.springframework.http.HttpStatus;
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

  @Override
  public Tag findById(Long tagId) {
    return repo.findById(tagId)
      .orElseThrow(()->new CustomException(HttpStatus.BAD_REQUEST, "해당 태그는 존재하지 않습니다.", "[ tagId = {} ]", tagId));
  }

}