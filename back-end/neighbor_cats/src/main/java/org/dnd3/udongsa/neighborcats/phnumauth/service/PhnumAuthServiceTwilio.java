package org.dnd3.udongsa.neighborcats.phnumauth.service;

import java.time.LocalDateTime;
import java.util.Objects;

import org.dnd3.udongsa.neighborcats.config.AppProperties;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeReqDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.SendCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.entity.PhnumAuthCode;
import org.dnd3.udongsa.neighborcats.phnumauth.repository.PhnumAuthCodeRepo;
import org.dnd3.udongsa.neighborcats.util.NumberGenerater;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PhnumAuthServiceTwilio implements PhnumAuthService {

    private final TwilioManager twilioManager;
    private final PhnumAuthCodeRepo repo;
    private final AppProperties properties;

    @Override
    public SendCodeResDto sendCode(final String phoneNumber) {

        final int code = new NumberGenerater().random(1000, 9999);
        int expireTime = Integer.parseInt(properties.getExpireTime());
        PhnumAuthCode phnumAuthCode = new PhnumAuthCode(phoneNumber, code, expireTime);
        repo.save(phnumAuthCode);

        String msgBody = "우리동네집사 인증번호는 [" + String.valueOf(code) + "] 입니다.";
        String messageSid = twilioManager.sendVerificationCodeMessage(phoneNumber, code, msgBody);
        if(Objects.isNull(messageSid)){
            throw new CustomException(HttpStatus.BAD_REQUEST, "인증번호 발송 실패");
        }
        final SendCodeResDto dto = new SendCodeResDto();
        dto.setPhoneNumber(phoneNumber);
        dto.setExpireTime(1800);
        return dto;
    }

    @Override
    public CheckCodeResDto checkCode(CheckCodeReqDto dto) {
        checkAuthCode(dto.getPhoneNumber(), dto.getVerificationCode());
        CheckCodeResDto resDto = new CheckCodeResDto();
        resDto.setPhoneNumber(dto.getPhoneNumber());
        return resDto;
    }

    private boolean checkAuthCode(String phNumber, Integer code){
        if(Objects.isNull(phNumber) || Objects.isNull(code)){
            throw new CustomException(HttpStatus.BAD_REQUEST, "요청 값이 Null입니다.");
        }
        PhnumAuthCode persist = repo.findById(phNumber)
                                .orElseThrow(()->
                                    new CustomException(HttpStatus.BAD_REQUEST, "휴대폰 인증 요청 기록이 없습니다."));
        // 현재 시각 < 마지막 업데이트 시각 + expire time
        boolean isValidTime = LocalDateTime.now().isBefore(persist.getUpdatedAt()
                                                                    .plusSeconds(persist.getExpireTime()));
        if(!isValidTime){
            throw new CustomException(HttpStatus.BAD_REQUEST, "인증 시간을 초과했습니다.");
        }
        if(!persist.getAuthCode().equals(code)){
            throw new CustomException(HttpStatus.BAD_REQUEST, "인증코드가 틀렸습니다");
        }
        return true;
                    
    }


}