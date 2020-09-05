package org.dnd3.udongsa.neighborcats.keep;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.feed.dao.FeedDao;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KeepServiceImpl implements KeepService{

  private final KeepRepository repo;
  private final SecurityContextService securityService;
  private final FeedDao feedDao;

  @Override
  public KeepDto save(KeepReqDto keepReqDto) {
    Servant servant = securityService.getLoggedUser();
    Feed feed = feedDao.findById(keepReqDto.getFeedId());
    Keep keep = Keep.of(servant, feed);
    if(repo.existsByServantAndFeed(servant, feed)){
      throw new CustomException(HttpStatus.BAD_REQUEST, "이미 보관을 하였습니다.");
    }
    keep = repo.save(keep);
    return new KeepDto(true);
  }

  @Override
  public void deleteByFeed(Feed feed) {
    repo.deleteAllByFeed(feed);
  }

  @Override
  public KeepDto delete(Long feedId) {
    Servant servant = securityService.getLoggedUser();
    Feed feed = feedDao.findById(feedId);
    Keep keep = repo.findByServantAndFeed(servant, feed);
    repo.delete(keep);
    return new KeepDto(false);
  }
  
}
