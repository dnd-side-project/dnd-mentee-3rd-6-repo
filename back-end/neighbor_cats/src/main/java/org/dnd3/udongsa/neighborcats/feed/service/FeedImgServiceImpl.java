package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedImg;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedImgRepo;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedImgServiceImpl implements FeedImgService {

  private final FeedImgRepo repo;
  private final ImgFileService imgFileService;

  @Override
  public List<ImgFileDto> getAllByFeed(Feed feed) {
    List<FeedImg> images = repo.findAllByFeed(feed);
    return images.stream().map((feedImg) -> {
      ImgFileDto dto = new ImgFileDto();
      dto.setId(feedImg.getImgFile().getId());
      dto.setUrl(ImgFileUtils.generateImgFileUrl(feedImg.getImgFile()));
      return dto;
    }).collect(Collectors.toList());
  }

  @Override
  public List<ImgFileDto> save(List<MultipartFile> imgFiles, Feed feed) {
    List<ImgFileDto> dtos = new ArrayList<>();
    for(MultipartFile file : imgFiles){
      ImgFile imgFile = imgFileService.save(file);
      FeedImg feedImg = FeedImg.of(feed, imgFile);
      repo.save(feedImg);
      dtos.add(new ImgFileDto(imgFile.getId(), ImgFileUtils.generateImgFileUrl(imgFile)));
    }
    return dtos;
  }

  @Override
  public void deleteByFeed(Feed feed) {
    List<FeedImg> feedImages = repo.findAllByFeed(feed);
    repo.deleteAll(feedImages);
    for(FeedImg feedImg : feedImages){
      imgFileService.delete(feedImg.getImgFile());
    }
  }
  
}