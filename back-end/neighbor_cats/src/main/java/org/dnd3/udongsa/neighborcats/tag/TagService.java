package org.dnd3.udongsa.neighborcats.tag;

import java.util.List;

public interface TagService {

	List<Tag> findAll(List<Long> tagIds);

	List<TagDto> getAll();

	Tag findById(Long tagId);
  
}