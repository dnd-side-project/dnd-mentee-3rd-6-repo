package org.dnd3.udongsa.neighborcats.feed.dao;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedDaoImpl implements FeedDao {

  private final FeedRepository repo;

  @Override
  public Feed findById(Long id) {
    return repo.findById(id).orElseThrow();
  }

  
}
