package org.dnd3.udongsa.neighborcats.catprofileimg;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor @Getter
public class CatProfileImg {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private Cat cat;

    @OneToOne
    @JoinColumn
    private ImgFile imgFile;

    public static CatProfileImg of(Cat cat, ImgFile imgFile){
        CatProfileImg profile = new CatProfileImg();
        profile.cat = cat;
        profile.imgFile = imgFile;
        return profile;
    }
}