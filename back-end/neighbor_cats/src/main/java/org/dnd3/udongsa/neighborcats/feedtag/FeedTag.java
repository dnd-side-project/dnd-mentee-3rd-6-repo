package org.dnd3.udongsa.neighborcats.feedtag;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.feed.Feed;
import org.dnd3.udongsa.neighborcats.tag.Tag;

@Entity
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
    
}