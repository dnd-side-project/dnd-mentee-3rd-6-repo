package org.dnd3.udongsa.neighborcats.keep;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;

@Entity @Getter
public class Keep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Servant servant;

    @ManyToOne
    @JoinColumn
    private Feed feed;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public static Keep of(Servant servant, Feed feed){
        Keep keep = new Keep();
        keep.servant = servant;
        keep.feed = feed;
        return keep;
    }
    
}