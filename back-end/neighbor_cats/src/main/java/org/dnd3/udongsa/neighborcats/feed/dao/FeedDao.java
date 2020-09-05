package org.dnd3.udongsa.neighborcats.feed.dao;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface FeedDao {

	Feed findById(Long feedId);
  
}
