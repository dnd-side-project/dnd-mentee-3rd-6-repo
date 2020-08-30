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
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
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

    private Double weight;
    
    @ManyToOne
    @JoinColumn
    private Servant servant;

    @OneToOne
    @JoinColumn
    private ImgFile profileImg;

    public Cat adoptServant(Servant servant){
        this.servant = servant;
        return this;
    }

    protected static Cat of(String name, String features, CatKind catKind, EGender gender, LocalDate birthday, ENeutralized neutralized, Double weight, Servant servant){
      Cat cat = new Cat();
      cat.name = name;
      cat.features = features;
      cat.kind = catKind;
      cat.gender = gender;
      cat.birthday = birthday;
      cat.neutralized = neutralized;
      cat.weight = weight;
      cat.servant = servant;
      return cat;
    }

    /**
     * ImgFile 연관관계를 제거한다.
     * @return 연관된 ImgFile 
     */
    public ImgFile detachProfileImg(){
      ImgFile imgFile = this.profileImg;
      this.profileImg = null;
      return imgFile;
    }

    public boolean attachProfileImg(ImgFile imgFile){
      this.profileImg = imgFile;
      return true;
    }
    
}