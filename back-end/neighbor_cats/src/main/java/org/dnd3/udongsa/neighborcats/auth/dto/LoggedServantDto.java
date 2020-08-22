package org.dnd3.udongsa.neighborcats.auth.dto;

import java.util.HashSet;
import java.util.Set;

import org.dnd3.udongsa.neighborcats.role.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @Builder @ToString
public class LoggedServantDto {

  private Long id;
  private String name;
  private String email;
  private String nickName;
  private String address;
  private String phoneNumber;
  private Set<Role> roles = new HashSet<>();
  
}