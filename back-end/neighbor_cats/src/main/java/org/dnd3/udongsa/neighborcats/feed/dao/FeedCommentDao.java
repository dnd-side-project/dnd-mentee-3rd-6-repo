package org.dnd3.udongsa.neighborcats.feed.dao;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;

public interface FeedCommentDao {

	FeedComment findById(Long commentId);
  
}
