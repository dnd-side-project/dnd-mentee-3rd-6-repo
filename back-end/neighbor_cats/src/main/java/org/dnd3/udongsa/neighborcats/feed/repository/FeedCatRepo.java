package org.dnd3.udongsa.neighborcats.feed.repository;

import java.util.List;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedCat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedCatRepo extends JpaRepository<FeedCat, Long>{

  @Query("SELECT fc.cat FROM FeedCat fc WHERE fc.feed=?1")
	List<Cat> findCatsByFeed(Feed feed);

  FeedCat findByFeedAndCat(Feed feed, Cat cat);

  List<FeedCat> findAllByFeed(Feed feed);
  
}
