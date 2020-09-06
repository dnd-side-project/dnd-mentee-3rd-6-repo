package org.dnd3.udongsa.neighborcats.feed.controller;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentModifyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveCommentDto;
import org.dnd3.udongsa.neighborcats.feed.service.FeedCommentService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/feed-comments")
@RequiredArgsConstructor
public class FeedCommentController {
  
  private final FeedCommentService service;

  @GetMapping("")
  public List<FeedCommentDto> getAll(@RequestParam Long feedId){
    return service.getAll(feedId);
  }

  @PostMapping("")
  public FeedCommentDto postComment(@RequestBody FeedSaveCommentDto commentSaveDto){
    return service.save(commentSaveDto);
  }

  @DeleteMapping("/{id}")
  public FeedCommentDto delete(@PathVariable("id") Long id){
    return service.deleteById(id);
  }  

  @PutMapping("/{id}")
  public FeedCommentDto modify(@PathVariable("id") Long id, @RequestBody FeedCommentModifyDto modifyDto){
    return service.modify(id, modifyDto);
  }
  
}
