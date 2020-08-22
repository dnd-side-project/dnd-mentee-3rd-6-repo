package org.dnd3.udongsa.neighborcats.auth;

import java.security.Principal;

import javax.validation.Valid;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.dnd3.udongsa.neighborcats.auth.dto.CatProfileUploadResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.LoggedServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

  @PostMapping("/sign-up")
  @ResponseStatus(code = HttpStatus.CREATED)
  public SignUpResDto signUp(@Valid @RequestBody SignUpReqDto reqDto) {
    return service.signUp(reqDto);
  }

  @Secured({ "ROLE_USER" })
  @PostMapping(value = "/sign-up/cat-profile-img", produces = "image/jpeg;charset=UTF-8")
  public ResponseEntity<String> signUpCatProfileImg(@RequestBody byte[] imgBytes, Principal principal){
    CatProfileUploadResDto resDto = service.signUpCatProfileImg(imgBytes);
    String json = "";
    try {
      json = new ObjectMapper().writeValueAsString(resDto);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
    return new ResponseEntity<String>(json, headers, HttpStatus.OK);
  }

  @PostMapping("/sign-in")
	public SignInResDto signIn(@Valid @RequestBody SignInReqDto reqDto){
		return service.signIn(reqDto);
  }
  
  @GetMapping("/email/is-exist")
  public Boolean isExistEmail(@RequestParam("email") String email){
    return service.isExistEmail(email);
  }

  @Secured({"ROLE_USER"})
  @GetMapping("/me")
  public LoggedServantDto getLoggedServant(){
    return service.getLoggedServant();
  }
  

}