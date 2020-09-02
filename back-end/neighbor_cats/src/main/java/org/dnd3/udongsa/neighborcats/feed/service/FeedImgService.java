package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.springframework.web.multipart.MultipartFile;

public interface FeedImgService {

	List<ImgFileDto> getAllByFeed(Feed feed);

	List<ImgFileDto> save(List<MultipartFile> imgFiles, Feed feed);

	void deleteByFeed(Feed feed);
  
}