package org.dnd3.udongsa.neighborcats.cat;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

@Entity
public class Cat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    // 특징
    private String features;

    // 품종
    private String kind;

    private String gender;
    
    private LocalDateTime birthday;
    
    // 프로필 이미지 파일 URL
    private String profileImgUrl;

    @ManyToOne
    @JoinColumn
    private Servant servant;
    
}