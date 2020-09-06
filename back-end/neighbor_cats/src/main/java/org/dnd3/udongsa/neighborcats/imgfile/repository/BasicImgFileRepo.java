package org.dnd3.udongsa.neighborcats.imgfile.repository;

import java.util.Optional;

import org.dnd3.udongsa.neighborcats.imgfile.BasicImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.EBasicImgType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasicImgFileRepo extends JpaRepository<BasicImgFile, Long>{

	Optional<BasicImgFile> findByType(EBasicImgType servant);

	boolean existsByType(EBasicImgType servant);
  
}