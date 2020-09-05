package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReply;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedReplyLike;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedReplyRepository;
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
public class FeedReplyServiceImpl implements FeedReplyService {

  private final FeedReplyRepository repo;
  private final SecurityContextService securityService;
  private final ServantService servantService;
  private final TimeDescService timeService;

  @Override
  public List<ReplyDto> getAllByComment(FeedComment comment) {
    List<FeedReply> replies = repo.findAllByFeedComment(comment);
    return replies.stream().map(reply->toDto(reply)).collect(Collectors.toList());
  }

  private ReplyDto toDto(FeedReply reply){
    ReplyDto dto = new ReplyDto();
    dto.setId(reply.getId());
    dto.setContent(reply.getContent());
    dto.setNumberOfLikes(reply.getLikes().size());
    dto.setLike(isLike(reply.getLikes()));
    dto.setCreatedDateTime(reply.getCreatedDateTime().toString());
    dto.setTimeDesc(timeService.generate(reply.getCreatedDateTime()));
    AuthorDto authorDto = ServantMapper.map(reply.getAuthor());
    dto.setAuthor(authorDto);
    return dto;
  }

  private boolean isLike(List<FeedReplyLike> likes){
    String email = securityService.getLoggedUserEmail();
    Servant servant = servantService.findServantByEmail(email);
    for(FeedReplyLike like : likes){
      if(like.getServant().getId() == servant.getId()){
        return true;
      }
    }
    return false;
  }

  @Override
  public void deleteByComments(List<FeedComment> comments) {
    for(FeedComment comment : comments){
      deleteByComment(comment);
    }
  }

  @Override
  public void deleteByComment(FeedComment comment) {
    List<FeedReply> replies = repo.findAllByFeedComment(comment);
    repo.deleteAll(replies);
  }
  
}