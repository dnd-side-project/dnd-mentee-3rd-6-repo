package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedTagDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTag;

public class FeedTagMapper {

	public static FeedTagDto map(FeedTag tag) {
    return new FeedTagDto(tag.getId(), tag.getName());
	}
  
}