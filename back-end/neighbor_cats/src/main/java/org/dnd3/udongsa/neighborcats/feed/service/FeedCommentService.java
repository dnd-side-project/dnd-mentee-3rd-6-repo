package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentModifyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveCommentDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface FeedCommentService {

	List<FeedCommentDto> getAllByFeed(Feed feed);

	void deleteByFeed(Feed feed);

	FeedCommentDto save(FeedSaveCommentDto commentSaveDto);

	List<FeedCommentDto> getAll(Long feedId);

	FeedCommentDto deleteById(Long id);

	FeedCommentDto modify(Long id, FeedCommentModifyDto modifyDto);
  
}