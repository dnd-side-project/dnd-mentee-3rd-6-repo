package org.dnd3.udongsa.neighborcats.tag;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Tag {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  protected static Tag of(String name){
    Tag tag = new Tag();
    tag.id = 0L;
    tag.name = name;
    return tag;
  }
  
}