package org.dnd3.udongsa.neighborcats.feed.controller;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedReplyLikeDto;
import org.dnd3.udongsa.neighborcats.feed.dto.LikeDto;
import org.dnd3.udongsa.neighborcats.feed.service.FeedReplyLikeService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reply-likes")
public class ReplyLikeController {
  
  private final FeedReplyLikeService service;

  @PostMapping("")
  public LikeDto like(@RequestBody FeedReplyLikeDto likeDto){
    return service.like(likeDto);
  }

  @DeleteMapping("")
  public LikeDto unLike(@RequestParam("replyId") Long replyId){
    return service.unLike(replyId);
  }
}
