package org.dnd3.udongsa.neighborcats.feed.repository;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedReplyRepository extends JpaRepository<FeedReply, Long>{

	List<FeedReply> findAllByFeedComment(FeedComment comment);

  
}