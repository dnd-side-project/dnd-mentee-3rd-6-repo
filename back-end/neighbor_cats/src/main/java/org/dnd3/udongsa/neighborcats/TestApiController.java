package org.dnd3.udongsa.neighborcats;

import java.util.Objects;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestApiController {

    @GetMapping("/api/test")
    public String test(){
        return "Hello API World!";
    }

    @Secured("ROLE_USER")
    @GetMapping(value="/api/auth/test")
    public String authTest() {
        return getLoggedUserEmail();
    }

    private String getLoggedUserEmail(){
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String currentPrincipalName = authentication.getName();
      if(Objects.isNull(currentPrincipalName)){
        throw new CustomException(HttpStatus.UNAUTHORIZED, "인증토큰이 올바르지 않습니다.");
      }
      return currentPrincipalName;
    }
    
}