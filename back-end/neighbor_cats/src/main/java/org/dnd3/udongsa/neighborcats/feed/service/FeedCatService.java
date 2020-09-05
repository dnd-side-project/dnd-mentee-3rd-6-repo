package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public interface FeedCatService {

	List<CatDto> findAllByFeed(Feed feed);

	void save(List<Long> catIds, Feed feed);

	void update(List<Long> catIds, Feed feed);

	void deleteByFeed(Feed feed);

	boolean doesHaveCat(Servant servant, List<Long> catIds);


  
}
