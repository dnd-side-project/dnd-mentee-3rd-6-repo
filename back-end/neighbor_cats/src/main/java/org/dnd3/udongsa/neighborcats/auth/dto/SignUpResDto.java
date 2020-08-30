package org.dnd3.udongsa.neighborcats.auth.dto;

import java.util.HashSet;
import java.util.Set;

import org.dnd3.udongsa.neighborcats.role.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class SignUpResDto {

  private String accessToken = "";
  private Long id = 0L;
  private String name = "";
  private String email = "";
  private String nickName = "";
  private String addressName = "";
  private String phoneNumber = "";
  private String profileImgUrl = "";
  private Boolean isServant = false;
  private Set<Role> roles = new HashSet<>(); 

  // private Long servantId;
  // private String phoneNumber;
  // private String name;
  // private String email;
  // private String password;
  // private Boolean isServant;
  // private String nickName;
  // private String addressName;
  // private Long catId;
  // private String catName;
  // private String catFeatures;
  // private Long catKindId;
  // private EGender catGender;
  // private LocalDate catBirthday;
  // private ENeutralized catNeutralized;
  // private String catProfileImgUrl;
  // private String accessToken;
  // private Double catWeight;

}
