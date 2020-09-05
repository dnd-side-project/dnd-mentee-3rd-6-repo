package org.dnd3.udongsa.neighborcats.feed.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;

@Entity
@Getter
public class FeedReply {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

  @ManyToOne
  @JoinColumn
  private FeedComment feedComment;

  @OneToMany(mappedBy = "feedReply", cascade = CascadeType.REFRESH)
  private List<FeedReplyLike> likes = new ArrayList<>();

  @ManyToOne
  @JoinColumn
  private Servant author;

  @CreationTimestamp
  private LocalDateTime createdDateTime;

  @UpdateTimestamp
  private LocalDateTime updatedDateTime;

  public static FeedReply of(String content, FeedComment feedComment, Servant author){
    FeedReply feedReply = new FeedReply();
    feedReply.content = content;
    feedReply.feedComment = feedComment;
    feedReply.author = author;
    return feedReply;
  }
  
}