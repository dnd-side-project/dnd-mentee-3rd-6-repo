package org.dnd3.udongsa.neighborcats.feed.entity;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantTestUtils;

import java.util.ArrayList;
import java.util.List;

public class FeedTestBuilder {

  public static Feed build(String content){
    Servant author = ServantTestUtils.generateDefault();
    Feed feed = Feed.of(content, author);
    return feed;
  }

  public static List<Feed> buildFeeds(String content){
    List<Feed> feeds = new ArrayList<>();
    for(int i=1; i<4; i++){
      feeds.add(FeedTestBuilder.build(""+i));
    }
    return feeds;
  }

  public static List<FeedDto> buildFeedDtoList(String content){
    List<FeedDto> dtoList = new ArrayList<>();
    for(int i=1; i<6; i++){
      FeedDto feedDto = new FeedDto();
      feedDto.setId(Long.valueOf(i));
      feedDto.setContent(content + i);
      dtoList.add(feedDto);
    }
    return dtoList;
  }
}
