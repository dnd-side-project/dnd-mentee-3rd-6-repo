package org.dnd3.udongsa.neighborcats.auth.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.role.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data @AllArgsConstructor @RequiredArgsConstructor 
public class ServantDto {

  private Long id;
  private String name;
  private String email;
  private String nickName;
  private String addressName;
  private String phoneNumber;
  private String profileImgUrl;
  private Boolean isServant;
  private Set<Role> roles = new HashSet<>();
  private List<CatDto> cats = new ArrayList<>();
  
}