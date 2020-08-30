package org.dnd3.udongsa.neighborcats.auth;

import javax.validation.Valid;

import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;
import org.dnd3.udongsa.neighborcats.auth.service.AuthService;
import org.springframework.http.HttpStatus;
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
  public SignUpResDto signUp(@Valid SignUpReqDto reqDto) {
    return service.signUp(reqDto);
  }

  @PostMapping("/sign-in")
	public SignInResDto signIn(@Valid @RequestBody SignInReqDto reqDto){
		return service.signIn(reqDto);
  }
  
  @GetMapping("/email/is-exist")
  public Boolean isExistEmail(@RequestParam("email") String email){
    return service.isExistEmail(email);
  }

 

}