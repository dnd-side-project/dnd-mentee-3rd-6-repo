package org.dnd3.udongsa.neighborcats.feed.repository;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed, Long>{
  
}