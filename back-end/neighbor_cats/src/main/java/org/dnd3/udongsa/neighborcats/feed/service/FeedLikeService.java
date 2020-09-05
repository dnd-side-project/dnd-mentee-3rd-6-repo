package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeReqDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface FeedLikeService {

	Boolean isLikeByServant(String loggedUserEmail, Feed feed);

	Long getNumberOfLikes(Feed feed);

	void deleteByFeed(Feed feed);

	FeedLikeDto like(FeedLikeReqDto reqDto);

	FeedLikeDto unLike(FeedLikeReqDto reqDto);
  
}