package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.Objects;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTag;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedTagRepo;
import org.dnd3.udongsa.neighborcats.tag.Tag;
import org.dnd3.udongsa.neighborcats.tag.TagDto;
import org.dnd3.udongsa.neighborcats.tag.TagService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedTagServiceImpl implements FeedTagService {

  private final FeedTagRepo repo;
  private final TagService tagService;

  @Override
  @Transactional(readOnly = true)
  public TagDto findTagDtoByFeed(Feed feed) {
    FeedTag feedTag = repo.findByFeed(feed);
    if(Objects.isNull(feedTag)){
      return new TagDto();
    }
    Tag tag = feedTag.getTag();
    return new TagDto(tag.getId(), tag.getName());
  }

  @Override
  @Transactional
  public TagDto save(Long tagId, Feed feed) {
    Tag tag = tagService.findById(tagId);
    FeedTag feedTag = FeedTag.of(tag, feed);
    repo.save(feedTag);
    return new TagDto(tag.getId(), tag.getName());
  }

  @Override
  public void deleteByFeed(Feed feed) {
    repo.deleteAllByFeed(feed);
  }

  @Override
  @Transactional
  public void update(Feed feed, Long modifyTagId) {
    Tag modifyTag = tagService.findById(modifyTagId);
    FeedTag persist = repo.findByFeed(feed);
    persist.updateTag(modifyTag);
    repo.save(persist);
  }

  @Override
  @Transactional(readOnly = true)
  public Tag findTagByTagId(Long tagId) {
    return tagService.findById(tagId);
  }
}