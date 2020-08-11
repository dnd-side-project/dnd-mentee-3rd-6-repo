package org.dnd3.udongsa.neighborcats.phnumauth.repository;

import org.dnd3.udongsa.neighborcats.phnumauth.entity.PhnumAuthCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhnumAuthCodeRepo extends JpaRepository<PhnumAuthCode, String>{
    
}