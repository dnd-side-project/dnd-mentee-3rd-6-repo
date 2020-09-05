package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedReplyLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.LikeDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReply;

public interface FeedReplyLikeService {

	void deleteByReply(FeedReply feedReply);

	LikeDto like(FeedReplyLikeDto likeDto);

	LikeDto unLike(FeedReplyLikeDto likeDto);
  
}
