package org.dnd3.udongsa.neighborcats.feedcomment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.commnet.Comment;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;

@Entity
public class FeedComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn
    private Comment comment;

    @ManyToOne
    @JoinColumn
    private Feed feed;

}