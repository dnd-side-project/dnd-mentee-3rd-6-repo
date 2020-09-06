package org.dnd3.udongsa.neighborcats.feed.repository;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedCommentLike;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedCommentLikeRepo extends JpaRepository<FeedCommentLike, Long>{

	long countByFeedComment(FeedComment comment);

	boolean existsByServantAndFeedComment(Servant servant, FeedComment feedComment);

	void deleteAllByFeedComment(FeedComment comment);

	FeedCommentLike findByFeedCommentAndServant(FeedComment feedComment, Servant servant);

}
