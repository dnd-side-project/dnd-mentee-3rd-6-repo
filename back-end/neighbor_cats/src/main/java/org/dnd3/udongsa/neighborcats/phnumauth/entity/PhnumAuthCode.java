package org.dnd3.udongsa.neighborcats.phnumauth.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @NoArgsConstructor
public class PhnumAuthCode {

    @Id
    private String phoneNumber;

    private Integer authCode;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Integer expireTime;

    public PhnumAuthCode(String phoneNumber, Integer authCode, Integer expireTime){
        this.phoneNumber = phoneNumber;
        this.authCode = authCode;
        this.expireTime = expireTime;
    }
    
    public PhnumAuthCode(String phoneNumber, Integer authCode, Integer expireTime, LocalDateTime updatedAt){
        this.phoneNumber = phoneNumber;
        this.authCode = authCode;
        this.expireTime = expireTime;
        this.updatedAt = updatedAt;
    }
    

}