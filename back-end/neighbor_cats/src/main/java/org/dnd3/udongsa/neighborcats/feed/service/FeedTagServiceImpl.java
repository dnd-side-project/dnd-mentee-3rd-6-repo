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

  @Override
  public void update(Feed feed, List<Long> modifyTagIds) {
    List<Tag> modifyTags = tagService.findAll(modifyTagIds);
    List<Tag> persistTags = repo.findAllByFeed(feed).stream().map(feedTag->feedTag.getTag()).collect(Collectors.toList());
    List<Tag> removeTags = new ArrayList<>();
    for(Tag tag : persistTags){
      if(!modifyTags.contains(tag)){
        removeTags.add(tag);
      }
    }
    for(Tag tag : removeTags){
      FeedTag feedTag = repo.findByTagAndFeed(tag, feed);
      repo.delete(feedTag);
    }
    
    List<Tag> insertTags = new ArrayList<>();
    for(Tag tag : modifyTags){
      if(!persistTags.contains(tag)){
        insertTags.add(tag);
      }
    }
    for(Tag tag : insertTags){
      FeedTag feedTag = FeedTag.of(tag, feed);
      repo.save(feedTag);
    }
  }
}