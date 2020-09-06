package org.dnd3.udongsa.neighborcats.address.repository;

import java.util.Optional;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AddressRepository extends JpaRepository<Address, Long>{

  @Query("SELECT adr FROM Address adr WHERE depth1=?1 AND depth2=?2 AND depth3=?3 AND depth4=?4")
	Optional<Address> findByDepths(String depth1, String depth2, String depth3, String depth4);
  
}