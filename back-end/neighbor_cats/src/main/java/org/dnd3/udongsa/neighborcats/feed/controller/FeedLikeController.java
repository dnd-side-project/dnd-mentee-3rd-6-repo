package org.dnd3.udongsa.neighborcats.feed.controller;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedLikeReqDto;
import org.dnd3.udongsa.neighborcats.feed.service.FeedLikeService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/feed-likes")
@RequiredArgsConstructor
public class FeedLikeController {
  
  private final FeedLikeService likeService;

  @PostMapping("")
  public FeedLikeDto save(@RequestBody FeedLikeReqDto reqDto){
    return likeService.like(reqDto);
  }

  @DeleteMapping("")
  public FeedLikeDto delete(@RequestBody FeedLikeReqDto reqDto){
    return likeService.unLike(reqDto);
  }
}
