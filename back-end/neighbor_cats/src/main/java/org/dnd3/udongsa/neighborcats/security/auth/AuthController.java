package org.dnd3.udongsa.neighborcats.security.auth;

import javax.validation.Valid;

import org.dnd3.udongsa.neighborcats.security.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpResDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auths")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService service;

	@PostMapping("/signup")
	public SignUpResDto signUp(@Valid @RequestBody SignUpReqDto reqDto){
		return service.signUp(reqDto);
	}

	@PostMapping("/signin")
	public SignInResDto signIn(@Valid @RequestBody SignInReqDto reqDto){
		return service.signIn(reqDto);
	}
}