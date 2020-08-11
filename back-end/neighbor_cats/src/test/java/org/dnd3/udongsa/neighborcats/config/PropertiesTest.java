package org.dnd3.udongsa.neighborcats.config;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;

@SpringBootTest
@Profile("dev")
public class PropertiesTest {

    @Autowired
    AppProperties properties;

    @Test
    public void Given_None_When_GetProperties_Then_Returned_Values(){
        String accountSid = properties.getAccountSid();
        String authToken = properties.getAuthToken();
        String phNumber = properties.getPhNumber();

        assertEquals("AC8a7c29db393b4f55a240c286c5be18de", accountSid);
        assertEquals("a09da283902952215152b5fcda6e1cf6", authToken);
        assertEquals("+18135366064", phNumber);
    }
    
}