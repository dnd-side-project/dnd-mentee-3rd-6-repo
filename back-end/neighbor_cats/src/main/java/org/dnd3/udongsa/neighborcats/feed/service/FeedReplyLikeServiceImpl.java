package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedReplyLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.LikeDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReply;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReplyLike;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedReplyLikeRepo;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedReplyRepository;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedReplyLikeServiceImpl implements FeedReplyLikeService {

  private final FeedReplyLikeRepo repo;
  private final SecurityContextService securityService;
  private final FeedReplyRepository feedReplyRepo;

  @Override
  public void deleteByReply(FeedReply feedReply) {
    List<FeedReplyLike> likes = repo.findAllByFeedReply(feedReply);
    repo.deleteAll(likes);
  }

  @Override
  public LikeDto like(FeedReplyLikeDto likeDto) {
    Servant servant = securityService.getLoggedUser();
    FeedReply feedReply = feedReplyRepo.findById(likeDto.getReplyId()).orElseThrow();
    if(repo.existsByServantAndFeedReply(servant, feedReply)){
      throw new CustomException(HttpStatus.BAD_REQUEST, "이미 좋아요를 하였습니다.");
    }
    FeedReplyLike like = FeedReplyLike.of(servant, feedReply);
    repo.save(like);
    return new LikeDto(true);
  }

  @Override
  public LikeDto unLike(FeedReplyLikeDto likeDto) {
    Servant servant = securityService.getLoggedUser();
    FeedReply feedReply = feedReplyRepo.findById(likeDto.getReplyId()).orElseThrow();
    FeedReplyLike like = repo.findByServantAndFeedReply(servant, feedReply);
    repo.delete(like);
    return new LikeDto(false);
  }
}
