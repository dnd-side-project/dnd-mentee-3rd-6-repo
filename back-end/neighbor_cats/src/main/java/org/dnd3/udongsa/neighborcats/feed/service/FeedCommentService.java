package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface FeedCommentService {

	List<FeedCommentDto> getAllByFeed(Feed feed);
  
}