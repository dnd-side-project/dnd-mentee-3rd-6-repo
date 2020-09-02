package org.dnd3.udongsa.neighborcats.feed.controller;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedModifyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSearchDto;
import org.dnd3.udongsa.neighborcats.feed.dto.PagingDto;
import org.dnd3.udongsa.neighborcats.feed.service.FeedService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
public class FeedController {
  
  private final FeedService service;

  @Secured("ROLE_USER")
  @GetMapping("")
  public PagingDto<FeedDto> getAll(FeedSearchDto serachDto){
    return service.findAll(serachDto);
  }

  @Secured("ROLE_USER")
  @PostMapping("")
  public FeedDto save(FeedSaveDto saveDto){
    return service.save(saveDto);
  }

  @GetMapping("/{id}")
  public FeedDto getOne(@PathVariable("id") Long id){
    return service.findById(id);
  }

  @DeleteMapping("/{id}")
  public FeedDto delete(@PathVariable("id") Long id){
    return service.delete(id);
  }

  @PutMapping("/{id}")
  public FeedDto modify(@PathVariable("id") Long id, FeedModifyDto modifyDto){
    return service.modify(modifyDto);
  }

}