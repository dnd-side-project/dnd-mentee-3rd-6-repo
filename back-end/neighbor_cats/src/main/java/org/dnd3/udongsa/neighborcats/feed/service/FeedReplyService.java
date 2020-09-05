package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.ReplySaveDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;

public interface FeedReplyService {

	List<ReplyDto> getAllByComment(FeedComment comment);

	void deleteByComments(List<FeedComment> comments);

	void deleteByComment(FeedComment comment);

	ReplyDto save(ReplySaveDto saveDto);

	ReplyDto delete(Long id);
  
}