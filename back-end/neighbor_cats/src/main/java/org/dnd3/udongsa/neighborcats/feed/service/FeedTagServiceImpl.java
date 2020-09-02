package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTag;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedTagRepo;
import org.dnd3.udongsa.neighborcats.tag.Tag;
import org.dnd3.udongsa.neighborcats.tag.TagDto;
import org.dnd3.udongsa.neighborcats.tag.TagService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedTagServiceImpl implements FeedTagService {

  private final FeedTagRepo repo;
  private final TagService tagService;

  @Override
  public List<TagDto> getAllByFeed(Feed feed) {
    List<FeedTag> tags = repo.findAllByFeed(feed);
    return tags.stream()
      .map(feedTag->{
        Tag tag = feedTag.getTag();
        return new TagDto(tag.getId(), tag.getName());
      }).collect(Collectors.toList());
  }

  @Override
  public List<TagDto> save(List<Long> tagIds, Feed feed) {
    List<TagDto> tagDtos = new ArrayList<>();
    List<Tag> tags = tagService.findAll(tagIds);
    for(Tag tag : tags){
      FeedTag feedTag = FeedTag.of(tag, feed);
      repo.save(feedTag);
      tagDtos.add(new TagDto(tag.getId(), tag.getName()));
    }
    return tagDtos;
  }

  @Override
  public void deleteByFeed(Feed feed) {
    repo.deleteAllByFeed(feed);
  }
  
}