package org.dnd3.udongsa.neighborcats.feed.repository;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedImg;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedImgRepo extends JpaRepository<FeedImg, Long>{

	List<FeedImg> findAllByFeed(Feed feed);

	FeedImg findByFeedAndImgFile(Feed feed, ImgFile imgFile);
  
}