package org.dnd3.udongsa.neighborcats.imgfile;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity @Getter
@NoArgsConstructor
public class ImgFile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @NotBlank
    private String filePath;

    @NotBlank
    private String fileName;

    // 확장자
    @NotBlank
    private String ext;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public static ImgFile of(String filePath, String fileName, String ext){
        ImgFile imgFile = new ImgFile();
        imgFile.filePath = filePath;
        imgFile.fileName = fileName;
        imgFile.ext = ext;
        return imgFile;
    }

    public void updateFile(String filePath, String fileName, String ext){
      this.filePath = filePath;
      this.fileName = fileName;
      this.ext = ext;
    }
}