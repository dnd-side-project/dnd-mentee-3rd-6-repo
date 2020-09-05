package org.dnd3.udongsa.neighborcats.keep;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/keeps")
@RequiredArgsConstructor
public class KeepController {
  
  private final KeepService keepService;;

  @PostMapping("")
  public KeepDto save(@RequestBody KeepReqDto keepReqDto){
    return keepService.save(keepReqDto);
  }

  @DeleteMapping("")
  public KeepDto delete(@RequestBody KeepReqDto keepReqDto){
    return keepService.delete(keepReqDto);
  }

}
