package org.dnd3.udongsa.neighborcats.imgfile.repository;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImgFileRepository extends JpaRepository<ImgFile, Long>{
  
}