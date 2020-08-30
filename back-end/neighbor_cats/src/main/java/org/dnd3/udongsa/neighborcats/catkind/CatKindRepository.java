package org.dnd3.udongsa.neighborcats.catkind;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatKindRepository extends JpaRepository<CatKind, Long>{

  List<CatKind> findAll(Sort sort);
  
}