package org.dnd3.udongsa.neighborcats.catprofileimg;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatProfileImgRepository extends JpaRepository<CatProfileImg, Long>{

	CatProfileImg findByCat(Cat cat);

	Boolean existsByCat(Cat cat);
  
}