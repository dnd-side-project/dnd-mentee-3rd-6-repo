package org.dnd3.udongsa.neighborcats.feedactivity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.feed.Feed;
import org.dnd3.udongsa.neighborcats.servant.Servant;

@Entity
public class FeedActivity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Feed feed;

    @ManyToOne
    @JoinColumn
    private Servant other;

    @ManyToOne
    @JoinColumn
    private Servant me;

    @Enumerated(EnumType.STRING)
    private FeedActivityType type;
}