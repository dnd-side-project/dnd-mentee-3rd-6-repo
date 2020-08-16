package org.dnd3.udongsa.neighborcats.phnumauth.repository;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;

@Repository
public class PhnumberAuthRepository {

    private final ConcurrentHashMap<String, Integer> phnumCodeMap = new ConcurrentHashMap<>();

	public boolean isExist(String phNumber) {
		return this.phnumCodeMap.containsKey(phNumber);
	}

	public Integer findCodeByPhnumber(String phNumber) {
		return this.phnumCodeMap.get(phNumber);
	}

	public void save(String phoneNumber, int code) {
        this.phnumCodeMap.put(phoneNumber, code);
	} 


}