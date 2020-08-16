package org.dnd3.udongsa.neighborcats.imgfile;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class ImgFile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    private String filePath;

    private String fileName;

    // 확장자
    private String ext;

    @CreationTimestamp
    private LocalDateTime createdAt;
}