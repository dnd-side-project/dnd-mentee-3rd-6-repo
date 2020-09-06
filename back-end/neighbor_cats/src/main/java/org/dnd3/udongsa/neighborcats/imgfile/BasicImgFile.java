package org.dnd3.udongsa.neighborcats.imgfile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;

@Entity @Getter
public class BasicImgFile {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(unique = true, nullable = false)
  private EBasicImgType type;

  @ManyToOne
  @JoinColumn(nullable = false)
  private ImgFile imgFile;

  public static BasicImgFile of(EBasicImgType type, ImgFile imgFile){
    BasicImgFile basicImgFile = new BasicImgFile();
    basicImgFile.type = type;
    basicImgFile.imgFile = imgFile;
    return basicImgFile;
  }

  public void updateImgFile(ImgFile imgFile){
    this.imgFile = imgFile;
  }
  
}