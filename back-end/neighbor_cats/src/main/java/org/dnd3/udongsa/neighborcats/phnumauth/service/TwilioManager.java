package org.dnd3.udongsa.neighborcats.phnumauth.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.dnd3.udongsa.neighborcats.config.AppProperties;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class TwilioManager {
    
    private final AppProperties properties;

    public String sendVerificationCodeMessage(String toPhNumber, int code, String massage){
        Twilio.init(properties.getAccountSid(), properties.getAuthToken());
        final Message message = Message.creator(new PhoneNumber("+82"+toPhNumber), // to
                                                new PhoneNumber(properties.getPhNumber()),   // from
                                                "[우리동네집사] 인증번호 [" + String.valueOf(code) + "]")
                                                .create();
        log.info("Message send from [{}] to [{}]. code [{}]. messageId: {}", properties.getPhNumber(), toPhNumber, code, message.getSid());
        return message.getSid();
    }
    
}