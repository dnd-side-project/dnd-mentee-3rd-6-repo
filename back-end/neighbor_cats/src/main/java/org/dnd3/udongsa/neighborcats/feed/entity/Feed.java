package org.dnd3.udongsa.neighborcats.feed.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.dnd3.udongsa.neighborcats.feed.repository.FeedLike;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;

@Entity @Getter
public class Feed {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn
    private Servant author;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "feed")
    List<FeedLike> likes = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "feed")
    List<FeedComment> comments = new ArrayList<>();

    protected static Feed of(String content, Servant author){
        Feed feed = new Feed();
        feed.content = content;
        feed.author = author;
        return feed;
    }

	public void update(String modifyContent) {
        this.content = modifyContent;
	}

}