package org.dnd3.udongsa.neighborcats.servant.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
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
  @JsonAlias("nickName")
  private String nickname;
  private String addressName;
  private String profileImgUrl;
  private Boolean isServant;
  private Set<Role> roles = new HashSet<>();
  private List<CatDto> cats = new ArrayList<>();
  
}