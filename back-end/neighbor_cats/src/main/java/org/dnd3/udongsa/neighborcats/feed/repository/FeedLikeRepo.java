package org.dnd3.udongsa.neighborcats.feed.repository;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedLikeRepo extends JpaRepository<FeedLike, Long>{

	Boolean existsByFeedAndServant(Feed feed, Servant servant);

	long countByFeed(Feed feed);

	void deleteAllByFeed(Feed feed);

	FeedLike findByServantAndFeed(Servant servant, Feed feed);
  
}