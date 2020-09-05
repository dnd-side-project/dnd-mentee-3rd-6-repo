package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.springframework.stereotype.Service;

@Service
public class FeedReplyServiceImpl implements FeedReplyService {

  @Override
  public List<ReplyDto> getAllByComment(FeedComment comment) {
    // TODO Auto-generated method stub
    return new ArrayList<ReplyDto>();
  }

  @Override
  public void deleteByComments(List<FeedComment> comments) {
    // TODO Auto-generated method stub
  }
  
}