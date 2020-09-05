package org.dnd3.udongsa.neighborcats.feed.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.tag.Tag;

import lombok.Getter;

@Entity @Getter
public class FeedTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn
    private Tag tag;

    @ManyToOne
    @JoinColumn
    private Feed feed;

    public static FeedTag of(Tag tag, Feed feed){
        FeedTag feedTag = new FeedTag();
        feedTag.tag = tag;
        feedTag.feed = feed;
        return feedTag;
    }
    
}