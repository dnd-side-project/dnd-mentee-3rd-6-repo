package org.dnd3.udongsa.neighborcats.phnumauth.controller;

import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeReqDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.SendCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.service.PhnumAuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class PhnumAuthController {

    private final PhnumAuthService authService;
    
    @GetMapping(value="/api/signup/phnumcode")
    public SendCodeResDto sendCode(@RequestParam String phoneNumber) {
        return authService.sendCode(phoneNumber);
    }

    @PostMapping(value="/api/signup/phnumcode")
    public CheckCodeResDto checkCode(@RequestBody CheckCodeReqDto dto){
        return authService.checkCode(dto);
    }
    

}