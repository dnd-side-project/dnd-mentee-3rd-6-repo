package org.dnd3.udongsa.neighborcats.feed.repository;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.tag.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedRepository extends JpaRepository<Feed, Long>{

  @Query("SELECT f from Feed f LEFT JOIN FeedTag ft ON f.id = ft.feed.id LEFT JOIN Servant svt ON f.author.id=svt.id WHERE ft.tag=?1 AND svt.address=?2 ORDER BY f.createdAt DESC")
  Page<Feed> findAllByTagAndAddress(Tag tag, Address address, Pageable pageable);

  @Query("SELECT f FROM Feed f ORDER BY f.likes.size DESC, f.comments.size DESC")
  Page<Feed> findByOrderByLikesAndCountOfComments(Pageable pageable);
  
}