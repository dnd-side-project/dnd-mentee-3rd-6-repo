package org.dnd3.udongsa.neighborcats.catkind;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter(value = AccessLevel.PRIVATE)
public class CatKind {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  public static CatKind of(String name){
    CatKind catKind = new CatKind();
    catKind.id = 0L;
    catKind.name = name;
    return catKind;
  }

}