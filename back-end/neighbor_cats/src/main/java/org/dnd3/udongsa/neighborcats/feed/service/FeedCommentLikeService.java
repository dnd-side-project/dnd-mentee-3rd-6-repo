package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;

public interface FeedCommentLikeService {

	Long getNumberOfLikes(FeedComment comment);

	Boolean isLike(String loggedUserEmail, FeedComment feedComment);
  
}