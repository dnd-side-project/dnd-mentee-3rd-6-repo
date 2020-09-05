package org.dnd3.udongsa.neighborcats.keep;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

public interface KeepService {

	KeepDto save(KeepReqDto keepReqDto);

	KeepDto delete(KeepReqDto keepReqDto);

	void deleteByFeed(Feed feed);
  
}
