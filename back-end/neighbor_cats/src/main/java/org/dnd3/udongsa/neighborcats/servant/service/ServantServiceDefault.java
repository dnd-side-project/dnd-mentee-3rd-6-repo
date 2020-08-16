package org.dnd3.udongsa.neighborcats.servant.service;

import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServantServiceDefault implements ServantService {

	final private ServantRepository repo;

	@Override
	public Boolean isExistEmail(String email) {
		return repo.existsByEmail(email);
	}


}