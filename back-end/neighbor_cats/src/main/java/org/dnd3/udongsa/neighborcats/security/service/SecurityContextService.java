package org.dnd3.udongsa.neighborcats.security.service;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public interface SecurityContextService {

  /**
   * Spring Seucrity Context에 유저 인증 정보를 추가합니다.
   * @param userEmail 사용자 이메일 정보
   * @return 성공 시 True. 실패 시 false
   */
  public boolean setAuthentication(String userEmail);

  public String getLoggedUserEmail();

public Servant getLoggedUser();
  
}