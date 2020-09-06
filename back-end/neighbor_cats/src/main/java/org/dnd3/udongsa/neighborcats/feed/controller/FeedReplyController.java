package org.dnd3.udongsa.neighborcats.feed.controller;

import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.ReplySaveDto;
import org.dnd3.udongsa.neighborcats.feed.service.FeedReplyService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/replies")
public class FeedReplyController {
  
  private final FeedReplyService service;

  @PostMapping("")
  public ReplyDto save(@RequestBody ReplySaveDto saveDto){
    return service.save(saveDto);
  };

  @DeleteMapping("/{id}")
  public ReplyDto delete(@PathVariable Long id){
    return service.delete(id);
  }
  
}
