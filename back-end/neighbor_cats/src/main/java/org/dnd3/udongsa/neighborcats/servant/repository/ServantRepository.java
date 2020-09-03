package org.dnd3.udongsa.neighborcats.servant.repository;

import java.util.Optional;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServantRepository extends JpaRepository<Servant, Long>{

  Optional<Servant> findByEmail(String email);

	Boolean existsByEmail(String email);

	Boolean existsByNickname(String nickname);
    
}