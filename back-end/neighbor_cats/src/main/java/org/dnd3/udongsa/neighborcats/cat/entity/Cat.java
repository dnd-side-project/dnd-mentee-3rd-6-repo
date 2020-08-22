package org.dnd3.udongsa.neighborcats.cat.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImg;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity @Getter
@NoArgsConstructor
public class Cat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    // 특징
    private String features;

    // 품종
    @ManyToOne
    @JoinColumn
    private CatKind kind;

    @Enumerated(EnumType.STRING)
    private EGender gender;
    
    private LocalDate birthday;

    private ENeutralized neutralized;
    
    @ManyToOne
    @JoinColumn
    private Servant servant;

    public Cat adoptServant(Servant servant){
        this.servant = servant;
        return this;
    }

    public Cat signUp(String name, String features, CatKind catKind, EGender gender, LocalDate birthday, ENeutralized neutralized, Servant servant){
        this.name = name;
        this.features = features;
        this.kind = catKind;
        this.gender = gender;
        this.birthday = birthday;
        this.neutralized = neutralized;
        this.servant = servant;
        return this;
    }
    
}