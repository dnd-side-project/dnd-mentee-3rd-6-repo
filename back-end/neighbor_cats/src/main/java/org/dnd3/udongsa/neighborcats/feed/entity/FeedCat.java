package org.dnd3.udongsa.neighborcats.feed.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;

import lombok.Data;

@Entity @Data
public class FeedCat {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn
  private Feed feed;

  @ManyToOne
  @JoinColumn
  private Cat cat;

  public static FeedCat of(Feed feed, Cat cat){
    FeedCat feedCat = new FeedCat();
    feedCat.feed = feed;
    feedCat.cat = cat;
    return feedCat;
  }

}
