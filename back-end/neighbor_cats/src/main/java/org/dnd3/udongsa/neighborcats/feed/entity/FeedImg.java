package org.dnd3.udongsa.neighborcats.feed.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;

import lombok.Getter;

@Entity @Getter
public class FeedImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Feed feed;

    @ManyToOne
    @JoinColumn
    private ImgFile imgFile;
    
}