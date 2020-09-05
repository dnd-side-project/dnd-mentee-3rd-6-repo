package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.tag.Tag;
import org.dnd3.udongsa.neighborcats.tag.TagDto;

public interface FeedTagService {

  /**
   * 해당 피드에 등록된 Tag 조회
   * @param feed 피드
   * @return 태그들
   */
	TagDto findTagDtoByFeed(Feed feed);

  void deleteByFeed(Feed feed);

  Tag findTagByTagId(Long tagId);

  void update(Feed persist, Long tagId);

  TagDto save(Long tagId, Feed feed);

}