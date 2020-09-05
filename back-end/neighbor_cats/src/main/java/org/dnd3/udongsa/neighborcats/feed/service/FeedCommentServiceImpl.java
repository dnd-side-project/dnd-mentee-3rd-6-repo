package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dao.FeedDao;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentModifyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedCommentRepo;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
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
  private final ServantService servantService;
  private final FeedDao feedDao;

  @Override
  public List<FeedCommentDto> getAllByFeed(Feed feed) {
    List<FeedComment> comments = repo.findAllByFeed(feed);
    List<FeedCommentDto> dtos = new ArrayList<>();
    for (FeedComment comment : comments) {
      dtos.add(toDto(comment));
    }
    return dtos;
  }

  @Override
  public void deleteByFeed(Feed feed) {
    List<FeedComment> comments = repo.findAllByFeed(feed);
    commentLikeService.deleteByComments(comments);
    replyService.deleteByComments(comments);
    repo.deleteAll(comments);
  }

  @Override
  public FeedCommentDto save(FeedSaveCommentDto saveDto) {
    Servant author = servantService.findServantByEmail(securityService.getLoggedUserEmail());
    Feed feed = feedDao.findById(saveDto.getFeedId());
    FeedComment comment = FeedComment.of(saveDto.getContent(), feed, author);
    comment = repo.save(comment);
    return toDto(comment);
  }

  private FeedCommentDto toDto(FeedComment comment) {
    long numberOfLikes = comment.getLikes().size();
    List<ReplyDto> replies = replyService.getAllByComment(comment);
    int numberOfReplies = comment.getReplies().size();
    boolean isLike = commentLikeService.isLike(securityService.getLoggedUserEmail(), comment);
    String createdDateTime = comment.getCreatedDateTime().toString();
    String timeDesc = timeDescService.generate(comment.getCreatedDateTime());
    AuthorDto authorDto = ServantMapper.map(comment.getAuthor());
    FeedCommentDto dto = FeedCommentMapper.map(comment, numberOfLikes, replies, numberOfReplies, isLike,
        createdDateTime, timeDesc, authorDto);
    return dto;
  }

  @Override
  public List<FeedCommentDto> getAll(Long feedId) {
    Feed feed = feedDao.findById(feedId);
    return getAllByFeed(feed);
  }

  @Override
  public FeedCommentDto deleteById(Long id) {
    FeedComment comment = repo.findById(id).orElseThrow();
    replyService.deleteByComment(comment);
    repo.delete(comment);
    FeedCommentDto dto = new FeedCommentDto();
    dto.setId(comment.getId());
    return dto;
  }

  @Override
  public FeedCommentDto modify(Long id, FeedCommentModifyDto modifyDto) {
    FeedComment comment = repo.findById(id).orElseThrow();
    comment.updateContent(modifyDto.getContent());
    repo.save(comment);
    return toDto(comment);
  }
  
}