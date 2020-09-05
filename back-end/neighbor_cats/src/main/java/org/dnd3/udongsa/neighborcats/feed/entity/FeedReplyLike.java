package org.dnd3.udongsa.neighborcats.feed.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;

@Entity @Getter
public class FeedReplyLike {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn
  private Servant servant;

  @ManyToOne
  @JoinColumn
  private FeedReply feedReply;

  @CreationTimestamp
  private LocalDateTime createdAt;

  public static FeedReplyLike of(Servant servant, FeedReply feedReply){
    FeedReplyLike like = new FeedReplyLike();
    like.servant = servant;
    like.feedReply = feedReply;
    return like;
  }
  
}
