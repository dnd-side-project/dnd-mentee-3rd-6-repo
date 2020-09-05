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

@Entity @Getter
public class FeedComment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn 
    private Feed feed;

    @ManyToOne
    @JoinColumn
    private Servant author;

    @OneToMany(mappedBy = "feedComment", cascade = CascadeType.REFRESH)
    private List<FeedCommentLike> likes = new ArrayList<>();

    @OneToMany(mappedBy = "feedComment", cascade = CascadeType.REFRESH)
    private List<FeedReply> replies = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    private LocalDateTime updatedDateTime;

    public static FeedComment of(String content, Feed feed, Servant author){
        FeedComment comment = new FeedComment();
        comment.content = content;
        comment.feed = feed;
        comment.author = author;
        return comment;
    }

	public void updateContent(String modifyContent) {
        this.content = modifyContent;
	}

}