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

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
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

    @ManyToOne
    @JoinColumn
    private Cat cat;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(cascade = CascadeType.REFRESH, mappedBy = "feed")
    List<FeedLike> likes = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REFRESH, mappedBy = "feed")
    List<FeedComment> comments = new ArrayList<>();

    protected static Feed of(String content, Servant author, Cat cat){
        Feed feed = new Feed();
        feed.content = content;
        feed.author = author;
        feed.cat = cat;
        return feed;
    }

	public void update(String modifyContent, Cat modifyCat) {
        this.content = modifyContent;
        this.cat = modifyCat;
	}

}