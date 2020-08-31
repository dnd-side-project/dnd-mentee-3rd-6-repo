package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedCommentRepo;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.util.TimeDescService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedCommentServiceImpl implements FeedCommentService {

  private final FeedCommentRepo repo;
  private final FeedCommentLikeService commentLikeService;
  private final FeedReplyService replyService;
  private final SecurityContextService securityService;
  private final TimeDescService timeDescService;


  @Override
  public List<FeedCommentDto> getAllByFeed(Feed feed) {
    List<FeedComment> comments = repo.findAllByFeed(feed);
    List<FeedCommentDto> dtos  = new ArrayList<>();
    for(FeedComment comment : comments){
      long numberOfLikes = commentLikeService.getNumberOfLikes(comment);
      List<ReplyDto> replies = replyService.getAllByComment(comment);
      int numberOfReplies = replies.size();
      boolean isLike = commentLikeService.isLike(securityService.getLoggedUserEmail(), comment);
      String createdDateTime = comment.getCreatedDateTime().toString();
      String timeDesc = timeDescService.generate(comment.getCreatedDateTime());
      AuthorDto authorDto = ServantMapper.map(comment.getAuthor());
      FeedCommentDto dto = FeedCommentMapper.map(comment, numberOfLikes, replies, numberOfReplies, isLike, createdDateTime, timeDesc, authorDto);
      dtos.add(dto);
    }
    return dtos;
  }
  
}