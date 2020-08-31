package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedCommentLikeRepo;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedCommentLikeServiceImpl implements FeedCommentLikeService {

  private final FeedCommentLikeRepo repo;
  private final ServantService servantService;

  @Override
  public Long getNumberOfLikes(FeedComment comment) {
    return repo.countByFeedComment(comment);
  }

  @Override
  public Boolean isLike(String loggedUserEmail, FeedComment feedComment) {
    Servant servant = servantService.findServantByEmail(loggedUserEmail);
    return repo.existsByServantAndFeedComment(servant, feedComment);
  }
  
}