package org.dnd3.udongsa.neighborcats.security.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SecurityContextServiceImpl implements SecurityContextService{

  private final UserDetailsService userDetailsService;

  @Override
  public boolean setAuthentication(String userEmail) {
    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
    UsernamePasswordAuthenticationToken authenticationToken = 
      new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    return true;
  }

  @Override
  public String getLoggedUserEmail() {
    // TODO Auto-generated method stub
    return null;
  }

  
}