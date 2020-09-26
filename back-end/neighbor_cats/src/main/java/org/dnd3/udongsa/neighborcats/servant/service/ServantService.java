package org.dnd3.udongsa.neighborcats.servant.service;

import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public interface ServantService {

  Boolean isExistEmail(String email);

  Servant save(SignUpReqDto reqDto, ERole roleUser);

  ServantDto findByEmail(String email);

  boolean isMatchPassword(String password, Long id);

  Servant findServantByEmail(String loggedUserEmail);

  Boolean isExistNickname(String nickname);

  ServantDto getMe();
}