package org.dnd3.udongsa.neighborcats.security.service;

import java.util.Objects;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SecurityContextServiceImpl implements SecurityContextService {

  private final UserDetailsService userDetailsService;
  private final ServantRepository servantRepo;

  @Override
  public boolean setAuthentication(String userEmail) {
    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null,
        userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    return true;
  }

  @Override
  public String getLoggedUserEmail() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    if (Objects.isNull(currentPrincipalName)) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, "인증토큰이 올바르지 않습니다.");
    }
    return currentPrincipalName;
  }

  @Override
  public Servant getLoggedUser() {
    String email = this.getLoggedUserEmail();
    return servantRepo.findByEmail(email).orElseThrow();
  }

  

  
}