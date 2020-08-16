package org.dnd3.udongsa.neighborcats.catprofileimg;

import org.dnd3.udongsa.neighborcats.cat.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatProfileImgRepository extends JpaRepository<CatProfileImg, Long>{

	CatProfileImg findByCat(Cat cat);
  
}