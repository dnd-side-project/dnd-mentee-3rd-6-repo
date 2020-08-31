package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface FeedLikeService {

	Boolean isLikeByServant(String loggedUserEmail, Feed feed);

	Long getNumberOfLikes(Feed feed);
  
}