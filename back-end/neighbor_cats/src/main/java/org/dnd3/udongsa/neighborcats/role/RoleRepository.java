package org.dnd3.udongsa.neighborcats.role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long>{

  Optional<Role> findByName(ERole name);
  
}