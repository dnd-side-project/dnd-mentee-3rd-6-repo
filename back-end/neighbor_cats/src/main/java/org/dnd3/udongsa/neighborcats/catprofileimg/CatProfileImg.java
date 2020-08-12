package org.dnd3.udongsa.neighborcats.catprofileimg;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.cat.Cat;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;

@Entity
public class CatProfileImg {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Cat cat;

    @ManyToOne
    @JoinColumn
    private ImgFile imgFile;

}