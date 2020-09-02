package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedLikeRepo;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedLikeServiceImpl implements FeedLikeService {

  private final ServantService servantService;
  private final FeedLikeRepo repo;

  @Override
  public Boolean isLikeByServant(String loggedUserEmail, Feed feed) {
    Servant servant = servantService.findServantByEmail(loggedUserEmail);
    return repo.existsByFeedAndServant(feed, servant);
  }

  @Override
  public Long getNumberOfLikes(Feed feed) {
    return repo.countByFeed(feed);
  }

  @Override
  public void deleteByFeed(Feed feed) {
    repo.deleteAllByFeed(feed);
  }
  
}