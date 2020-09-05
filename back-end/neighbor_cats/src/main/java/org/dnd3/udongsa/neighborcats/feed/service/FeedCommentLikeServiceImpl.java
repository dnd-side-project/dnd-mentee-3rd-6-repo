package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.feed.dao.FeedCommentDao;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.LikeDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedCommentLike;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedCommentLikeRepo;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedCommentLikeServiceImpl implements FeedCommentLikeService {

  private final FeedCommentLikeRepo repo;
  private final ServantService servantService;
  private final FeedCommentDao feedCommentDao;
  private final SecurityContextService securityService;

  @Override
  public Long getNumberOfLikes(FeedComment comment) {
    return repo.countByFeedComment(comment);
  }

  @Override
  public Boolean isLike(String loggedUserEmail, FeedComment feedComment) {
    Servant servant = servantService.findServantByEmail(loggedUserEmail);
    return repo.existsByServantAndFeedComment(servant, feedComment);
  }

  @Override
  public void deleteByComments(List<FeedComment> comments) {
    for (FeedComment comment : comments) {
      repo.deleteAllByFeedComment(comment);
    }
  }

  @Override
  public LikeDto like(FeedCommentLikeDto likeDto) {
    FeedComment feedComment = feedCommentDao.findById(likeDto.getCommentId());
    Servant servant = securityService.getLoggedUser();
    if(repo.existsByServantAndFeedComment(servant, feedComment)){
      throw new CustomException(HttpStatus.BAD_REQUEST, "이미 좋아요를 하였습니다.");
    }
    FeedCommentLike like = FeedCommentLike.of(feedComment, servant);
    repo.save(like);
    return new LikeDto(true);
  }

  @Override
  public LikeDto unLike(FeedCommentLikeDto likeDto) {
    FeedComment feedComment = feedCommentDao.findById(likeDto.getCommentId());
    Servant servant = securityService.getLoggedUser();
    FeedCommentLike like = repo.findByFeedCommentAndServant(feedComment, servant);
    repo.delete(like);
    return new LikeDto(false);
  }

  @Override
  public void deleteByComment(FeedComment comment) {
    repo.deleteAllByFeedComment(comment);
  }
  
}