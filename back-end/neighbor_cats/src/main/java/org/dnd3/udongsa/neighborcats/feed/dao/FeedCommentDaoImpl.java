package org.dnd3.udongsa.neighborcats.feed.dao;

import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedCommentRepo;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedCommentDaoImpl implements FeedCommentDao {

  private final FeedCommentRepo repo;

  @Override
  public FeedComment findById(Long commentId) {
    return repo.findById(commentId).orElseThrow();
  }
  
}
