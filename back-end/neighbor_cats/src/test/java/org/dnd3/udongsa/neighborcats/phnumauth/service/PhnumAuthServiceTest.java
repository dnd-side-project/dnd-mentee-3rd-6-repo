package org.dnd3.udongsa.neighborcats.phnumauth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import org.dnd3.udongsa.neighborcats.config.AppProperties;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeReqDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.CheckCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.dto.SendCodeResDto;
import org.dnd3.udongsa.neighborcats.phnumauth.entity.PhnumAuthCode;
import org.dnd3.udongsa.neighborcats.phnumauth.repository.PhnumAuthCodeRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

@ExtendWith(MockitoExtension.class)
public class PhnumAuthServiceTest {

    private PhnumAuthService service;
    @Mock
    private PhnumAuthCodeRepo repo;
    @Mock
    private TwilioManager twilioManager;
    private AppProperties properties;


    @BeforeEach
    public void setup(){
        this.properties = new AppProperties();
        properties.setAccountSid("accountSid");
        properties.setAuthToken("authToken");
        properties.setExpireTime("180");
        properties.setPhNumber("phNumber");
        this.service = new PhnumAuthServiceTwilio(twilioManager, repo, properties);
    }

    @Test
    public void Given_Phnum_When_SendCode_Then_Returned_PhnumCodeDto(){
        // given
        String phoneNumber = "010999911111";
        when(twilioManager.sendVerificationCodeMessage(anyString(), anyInt(), anyString())).thenReturn("id");
        // when
        SendCodeResDto dto = this.service.sendCode(phoneNumber);
        // then
        assertEquals(phoneNumber, dto.getPhoneNumber());
    }

    @Test
    public void Given_SendFailed_When_sendCode_Then_Thorw_BadRequest(){
        String phoneNumber = "010999911111";
        CustomException ex = assertThrows(CustomException.class, () -> {
            this.service.sendCode(phoneNumber);
          },"Expected ResponseStatusException");
        assertEquals(HttpStatus.BAD_REQUEST, ex.getHttpStatus());
    }

    @Test
    public void Given_ValidCode_When_checkCode_Then_Returned_Phnumber(){
        // given
        int code = 1234;
        String phnum = "0101234567";
        PhnumAuthCode entity = new PhnumAuthCode(phnum, code, 160, LocalDateTime.now());
        when(repo.findById(phnum)).thenReturn(Optional.of(entity));
        CheckCodeReqDto reqDto = new CheckCodeReqDto();
        reqDto.setPhoneNumber(phnum);
        reqDto.setVerificationCode(code);

        // when
        CheckCodeResDto resDto = this.service.checkCode(reqDto);

        // then
        assertEquals(phnum, resDto.getPhoneNumber());
    }

    @Test
    public void Given_InValidCode_When_CheckCode_Then_Throws_BadRequestException(){
        // given
        int code = 1234;
        int invalidCode = 4321;
        String phnum = "0101234567";
        PhnumAuthCode entity = new PhnumAuthCode(phnum, code, 160, LocalDateTime.now());
        when(repo.findById(phnum)).thenReturn(Optional.of(entity));
        CheckCodeReqDto reqDto = new CheckCodeReqDto();
        reqDto.setPhoneNumber(phnum);
        reqDto.setVerificationCode(invalidCode);

        // when
        CustomException ex = assertThrows(CustomException.class, ()->
                                                this.service.checkCode(reqDto),
                                                "Expected BadRequest Exception");

        // then
        assertEquals(HttpStatus.BAD_REQUEST, ex.getHttpStatus());
    }
    @Test
    public void Given_expired_When_CheckCode_Then_Throws_BadRequestException(){
        // given
        int code = 1234;
        int invalidCode = 4321;
        String phnum = "0101234567";
        LocalDateTime now = LocalDateTime.now();
        PhnumAuthCode entity = new PhnumAuthCode(phnum, code, 160, now.minusSeconds(170));
        when(repo.findById(phnum)).thenReturn(Optional.of(entity));
        CheckCodeReqDto reqDto = new CheckCodeReqDto();
        reqDto.setPhoneNumber(phnum);
        reqDto.setVerificationCode(invalidCode);

        // when
        CustomException ex = assertThrows(CustomException.class, ()->
                                                this.service.checkCode(reqDto),
                                                "Expected BadRequest Exception");

        // then
        assertEquals(HttpStatus.BAD_REQUEST, ex.getHttpStatus());
    }
}