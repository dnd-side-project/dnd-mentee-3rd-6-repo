package org.dnd3.udongsa.neighborcats.feed.controller;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.LikeDto;
import org.dnd3.udongsa.neighborcats.feed.service.FeedCommentLikeService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comment-likes")
@RequiredArgsConstructor
public class FeedCommentLikeController {

  private final FeedCommentLikeService service;

  @PostMapping("")
  public LikeDto like(@RequestBody FeedCommentLikeDto likeDto){
    return service.like(likeDto);
  }

  @DeleteMapping("")
  public LikeDto unLike(@RequestBody FeedCommentLikeDto likeDto){
    return service.unLike(likeDto);
  }
  
}
