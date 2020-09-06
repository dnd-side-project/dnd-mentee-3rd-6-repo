package org.dnd3.udongsa.neighborcats.tag;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {
  
  private final TagService tagService;

  @GetMapping("")
  public List<TagDto> getAll(){
    return tagService.getAll();
  }
}
