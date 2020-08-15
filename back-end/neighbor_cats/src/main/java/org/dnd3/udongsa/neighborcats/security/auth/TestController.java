package org.dnd3.udongsa.neighborcats.security.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
  
  @GetMapping("/api/test/123")
  public String get(){
    return "123";
  }
}