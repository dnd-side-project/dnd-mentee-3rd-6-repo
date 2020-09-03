package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.tag.TagDto;

public interface FeedTagService {

  /**
   * 해당 피드에 등록된 Tag 조회
   * @param feed 피드
   * @return 태그들
   */
	List<TagDto> getAllByFeed(Feed feed);

  List<TagDto> save(List<Long> tagIds, Feed feed);

  void deleteByFeed(Feed feed);

void update(Feed persist, List<Long> feedTagIds);
  
}