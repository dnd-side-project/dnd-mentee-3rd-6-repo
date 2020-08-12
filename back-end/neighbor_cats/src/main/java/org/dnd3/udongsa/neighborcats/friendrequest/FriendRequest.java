package org.dnd3.udongsa.neighborcats.friendrequest;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.servant.Servant;
import org.hibernate.annotations.CreationTimestamp;

@Entity
public class FriendRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Servant other;

    @ManyToOne
    private Servant me;

    @CreationTimestamp
    private LocalDateTime createdAt; 
}