package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;

public interface FeedImgService {

	List<ImgFileDto> getAllByFeed(Feed feed);
  
}