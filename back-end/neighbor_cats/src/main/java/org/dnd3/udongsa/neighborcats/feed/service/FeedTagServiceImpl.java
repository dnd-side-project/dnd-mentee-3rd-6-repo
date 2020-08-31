package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedTagDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTag;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedTagRepo;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedTagServiceImpl implements FeedTagService {

  private final FeedTagRepo repo;

  @Override
  public List<FeedTagDto> getAllByFeed(Feed feed) {
    List<FeedTag> tags = repo.findAllByFeed(feed);
    return tags.stream().map(tag->FeedTagMapper.map(tag)).collect(Collectors.toList());
  }
  
}