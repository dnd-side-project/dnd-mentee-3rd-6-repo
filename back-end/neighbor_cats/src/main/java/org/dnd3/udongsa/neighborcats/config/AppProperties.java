package org.dnd3.udongsa.neighborcats.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@Getter @Setter
@PropertySource("classpath:application-${spring.profiles.active}.properties")
@ConfigurationProperties
public class AppProperties {

    @Value("${ACCOUNT_SID}")
    private String accountSid;

    @Value("${AUTH_TOKEN}")
    private String authToken;

    @Value("${phNumber}")
    private String phNumber;

    @Value("${expireTime}")
    private String expireTime;
}