package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedTagDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface FeedTagService {

  /**
   * 해당 피드에 등록된 Tag 조회
   * @param feed 피드
   * @return 태그들
   */
	List<FeedTagDto> getAllByFeed(Feed feed);
  
}