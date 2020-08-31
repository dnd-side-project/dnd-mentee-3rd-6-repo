package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;

public interface FeedReplyService {

	List<ReplyDto> getAllByComment(FeedComment comment);
  
}