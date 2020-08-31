package org.dnd3.udongsa.neighborcats.feed.repository;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedTagRepo extends JpaRepository<FeedTag, Long>{

	List<FeedTag> findAllByFeed(Feed feed);
  
}