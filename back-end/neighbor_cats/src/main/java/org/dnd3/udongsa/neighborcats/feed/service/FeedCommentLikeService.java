package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;

public interface FeedCommentLikeService {

	Long getNumberOfLikes(FeedComment comment);

	Boolean isLike(String loggedUserEmail, FeedComment feedComment);

	void deleteByComments(List<FeedComment> comments);
  
}