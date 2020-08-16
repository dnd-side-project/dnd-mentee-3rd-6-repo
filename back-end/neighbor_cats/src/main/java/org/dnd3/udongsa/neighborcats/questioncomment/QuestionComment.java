package org.dnd3.udongsa.neighborcats.questioncomment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.commnet.Comment;
import org.dnd3.udongsa.neighborcats.question.Question;

@Entity
public class QuestionComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Question question;

    @ManyToOne
    @JoinColumn
    private Comment comment;
    
}