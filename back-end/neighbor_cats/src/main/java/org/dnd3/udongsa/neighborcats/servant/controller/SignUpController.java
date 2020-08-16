package org.dnd3.udongsa.neighborcats.servant.controller;

import java.security.Principal;

import org.dnd3.udongsa.neighborcats.servant.dto.ProfileImgDto;
import org.dnd3.udongsa.neighborcats.servant.dto.ProfileUploadDto;
import org.dnd3.udongsa.neighborcats.servant.dto.SignUpCatDto;
import org.dnd3.udongsa.neighborcats.servant.dto.SignUpCatResDto;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class SignUpController {

  private final ServantService servantService;

  @PostMapping("/api/signup/cats/profileimg")
  public ProfileImgDto uploadProfileForSignup(ProfileUploadDto uploadDto, Principal principal) {
      return servantService.uploadProfileForSignup(uploadDto, principal.getName());
  }

  @PostMapping("/api/signup/cats")
  public SignUpCatResDto signUpCat(@RequestBody SignUpCatDto dto, Principal principal){
    return servantService.signUpCat(dto, principal.getName());
  }
  
  
}