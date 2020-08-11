package org.dnd3.udongsa.neighborcats.phnumauth.service;

import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeReqDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.SendCodeResDto;

public interface PhnumAuthService {

	SendCodeResDto sendCode(String phoneNumber);

	CheckCodeResDto checkCode(CheckCodeReqDto dto);
    
}