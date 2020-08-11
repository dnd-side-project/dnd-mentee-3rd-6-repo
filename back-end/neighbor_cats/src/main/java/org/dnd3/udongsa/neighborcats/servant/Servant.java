package org.dnd3.udongsa.neighborcats.servant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Servant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String email;

    private String password;

    private String nickname;

    // 우편번호
    private String postcode;

    private String phoneNumber;

}