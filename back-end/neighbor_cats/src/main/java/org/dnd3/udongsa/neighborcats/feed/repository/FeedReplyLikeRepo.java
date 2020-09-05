package org.dnd3.udongsa.neighborcats.feed.repository;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedReply;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReplyLike;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedReplyLikeRepo extends JpaRepository<FeedReplyLike, Long>{

	List<FeedReplyLike> findAllByFeedReply(FeedReply feedReply);

	boolean existsByServantAndFeedReply(Servant servant, FeedReply feedReply);

	FeedReplyLike findByServantAndFeedReply(Servant servant, FeedReply feedReply);
  
}
