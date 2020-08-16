package org.dnd3.udongsa.neighborcats.questionimg;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.question.Question;

@Entity
public class QuestionImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private ImgFile imgFile;

    @ManyToOne
    @JoinColumn
    private Question question;
    
}