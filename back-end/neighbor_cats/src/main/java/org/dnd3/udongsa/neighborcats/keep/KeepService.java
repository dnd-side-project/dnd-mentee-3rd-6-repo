package org.dnd3.udongsa.neighborcats.keep;

public interface KeepService {

	KeepDto save(KeepReqDto keepReqDto);

	KeepDto delete(KeepReqDto keepReqDto);
  
}
