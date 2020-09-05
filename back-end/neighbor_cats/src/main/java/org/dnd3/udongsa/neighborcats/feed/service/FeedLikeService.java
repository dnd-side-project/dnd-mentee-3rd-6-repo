package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeReqDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public interface FeedLikeService {

	Long getNumberOfLikes(Feed feed);

	void deleteByFeed(Feed feed);

	FeedLikeDto like(FeedLikeReqDto reqDto);

	Boolean isLikeByServant(Servant loggedUser, Feed feed);

	FeedLikeDto unLike(Long feedId);
  
}