package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.cat.entity.CatMapper;
import org.dnd3.udongsa.neighborcats.cat.service.CatService;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedCat;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedCatRepo;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedCatServiceImpl implements FeedCatService {

  private final FeedCatRepo repo;
  private final CatService catService;

  @Override
  @Transactional(readOnly = true)
  public List<CatDto> findAllByFeed(Feed feed) {
    List<Cat> cats = repo.findCatsByFeed(feed);
    return cats.stream().map(CatMapper::map).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void save(List<Long> catIds, Feed feed) {
    List<Cat> cats = catService.findAllByIds(catIds);
    for (Cat cat : cats) {
      FeedCat feedCat = FeedCat.of(feed, cat);
      repo.save(feedCat);
    }
  }

  @Override
  @Transactional
  public void update(List<Long> catIds, Feed feed) {
    List<Cat> persist = repo.findCatsByFeed(feed);
    List<Cat> modifyCats = catService.findAllByIds(catIds);
    // 추가 될 고양이: 요청 캣리스트에는 있지만, 저장 캣 리스트에는 없는 냥이
    for (Cat cat : modifyCats) {
      if (persist.contains(cat))
        continue;
      repo.save(FeedCat.of(feed, cat));
    }
    // 삭제 될 고양이: 저장 캣 리스트에는 있지만 요청 캣리스트에는 없는 냥이
    for (Cat cat : persist) {
      if (modifyCats.contains(cat))
        continue;
      FeedCat feedCat = repo.findByFeedAndCat(feed, cat);
      repo.delete(feedCat);
    }
  }

  @Override
  @Transactional
  public void deleteByFeed(Feed feed) {
    List<FeedCat> feedCats = repo.findAllByFeed(feed);
    repo.deleteAll(feedCats);
  }

  @Override
  public boolean doesHaveCat(Servant servant, List<Long> catIds) {
    List<Cat> cats = catService.findAllByIds(catIds);
    for(Cat cat : cats){
      if(cat.getServant().getId() != servant.getId()){
        return false;
      }
    }
    return true;
  }
}
