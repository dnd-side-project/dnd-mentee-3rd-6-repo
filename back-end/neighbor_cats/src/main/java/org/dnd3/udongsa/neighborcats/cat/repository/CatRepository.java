package org.dnd3.udongsa.neighborcats.cat.repository;

import java.util.List;

import org.dnd3.udongsa.neighborcats.cat.Cat;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatRepository extends JpaRepository<Cat, Long>{

	List<Cat> findByServant(Servant servant);
  
}