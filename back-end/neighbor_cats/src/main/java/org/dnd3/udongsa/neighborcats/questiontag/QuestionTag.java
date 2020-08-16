package org.dnd3.udongsa.neighborcats.questiontag;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.question.Question;
import org.dnd3.udongsa.neighborcats.tag.Tag;

@Entity
public class QuestionTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Question question;

    @ManyToOne
    @JoinColumn
    private Tag tag;
}