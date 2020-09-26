package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

import java.util.List;

public interface FeedMapperService {

  FeedDto toDto(Feed feed, boolean withComments);
  List<FeedDto> toDto(List<Feed> feed, boolean withComments);

}
