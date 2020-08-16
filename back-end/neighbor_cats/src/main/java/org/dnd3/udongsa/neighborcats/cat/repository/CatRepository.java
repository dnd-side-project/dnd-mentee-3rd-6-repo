package org.dnd3.udongsa.neighborcats.cat.repository;

import org.dnd3.udongsa.neighborcats.cat.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatRepository extends JpaRepository<Cat, Long>{
  
}