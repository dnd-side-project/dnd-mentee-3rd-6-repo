package org.dnd3.udongsa.neighborcats.auth.dto;

import java.util.HashSet;
import java.util.Set;

import org.dnd3.udongsa.neighborcats.role.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class SignInResDto {

  private String accessToken = "";
  private Long id = 0L;
  private String name = "";
  private String email = "";
  private String nickName = "";
  private String addressName = "";
  private String phoneNumber = "";
  private String profileImgUrl = "";
  private Set<Role> roles = new HashSet<>(); 

}