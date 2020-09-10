package org.dnd3.udongsa.neighborcats.auth;

import javax.validation.Valid;

import org.dnd3.udongsa.neighborcats.auth.dto.MeInfo;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.TokenDto;
import org.dnd3.udongsa.neighborcats.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService service;

  @PostMapping(value="/sign-up")
  @ResponseStatus(code = HttpStatus.CREATED)
  public TokenDto signUp(@Valid SignUpReqDto reqDto) {
    return service.signUp(reqDto);
  }

  @PostMapping("/sign-in")
	public TokenDto signIn(@Valid @RequestBody SignInReqDto reqDto){
		return service.signIn(reqDto);
  }
  
  @GetMapping("/email/is-exist")
  public Boolean isExistEmail(@RequestParam("email") String email){
    return service.isExistEmail(email);
  }

  @GetMapping("/nickname/is-exist")
  public Boolean isExistNickname(@RequestParam("nickname") String nickname){
    return service.isExistNickname(nickname);
  }

  @Secured("ROLE_USER")
  @GetMapping("/me")
  public MeInfo getMe(){
    return service.getMe();
  }

 

}