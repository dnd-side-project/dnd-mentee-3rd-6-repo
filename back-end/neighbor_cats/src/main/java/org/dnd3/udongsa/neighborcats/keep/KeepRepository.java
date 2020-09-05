package org.dnd3.udongsa.neighborcats.keep;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeepRepository extends JpaRepository<Keep, Long>{

	boolean existsByServantAndFeed(Servant servant, Feed feed);

	Keep findByServantAndFeed(Servant servant, Feed feed);
  
}
