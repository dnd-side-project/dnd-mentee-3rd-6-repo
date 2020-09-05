package org.dnd3.udongsa.neighborcats.feed.repository;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTag;
import org.dnd3.udongsa.neighborcats.tag.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedTagRepo extends JpaRepository<FeedTag, Long>{

	void deleteAllByFeed(Feed feed);

	FeedTag findByTagAndFeed(Tag tag, Feed feed);

	@Query("SELECT ft.feed FROM FeedTag ft WHERE ft.tag = ?1 ORDER BY ft.feed.createdAt DESC")
	Page<Feed> findFeedByTag(Tag tag, Pageable pageable);

	FeedTag findByFeed(Feed feed);

}