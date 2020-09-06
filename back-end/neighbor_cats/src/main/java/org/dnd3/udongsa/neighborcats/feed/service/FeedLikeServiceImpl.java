package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.feed.dao.FeedDao;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeReqDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedLike;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedLikeRepo;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedLikeServiceImpl implements FeedLikeService {

  private final FeedLikeRepo repo;
  private final SecurityContextService securityService;
  private final FeedDao feedDao;

  @Override
  public Long getNumberOfLikes(Feed feed) {
    return repo.countByFeed(feed);
  }

  @Override
  public void deleteByFeed(Feed feed) {
    repo.deleteAllByFeed(feed);
  }

  @Override
  public FeedLikeDto like(FeedLikeReqDto reqDto) {
    Servant servant = securityService.getLoggedUser();
    Feed feed = feedDao.findById(reqDto.getFeedId());
    if(repo.existsByFeedAndServant(feed, servant)){
      throw new CustomException(HttpStatus.BAD_REQUEST, "이미 좋아요를 하였습니다.");
    }
    FeedLike feedLike = FeedLike.of(servant, feed);
    repo.save(feedLike);
    return new FeedLikeDto(true);
  }

  @Override
  public Boolean isLikeByServant(Servant loggedUser, Feed feed) {
    return repo.existsByFeedAndServant(feed, loggedUser);
  }

  @Override
  public FeedLikeDto unLike(Long feedId) {
    Servant servant = securityService.getLoggedUser();
    Feed feed = feedDao.findById(feedId);
    FeedLike feedLike = repo.findByServantAndFeed(servant, feed);
    repo.delete(feedLike);
    return new FeedLikeDto(false);
  }
  
}