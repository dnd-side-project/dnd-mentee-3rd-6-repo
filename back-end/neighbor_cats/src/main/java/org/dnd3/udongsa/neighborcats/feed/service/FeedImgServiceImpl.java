package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedImg;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedImgRepo;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedImgServiceImpl implements FeedImgService {

  private final FeedImgRepo repo;

  @Override
  public List<ImgFileDto> getAllByFeed(Feed feed) {
    List<FeedImg> images = repo.findAllByFeed(feed); 
    return images.stream().map((feedImg)->{
      ImgFileDto dto = new ImgFileDto();
      dto.setId(feedImg.getImgFile().getId());
      dto.setUrl(ImgFileUtils.generateImgFileUrl(feedImg.getImgFile()));
      return dto;
    }).collect(Collectors.toList());
  }
  
}