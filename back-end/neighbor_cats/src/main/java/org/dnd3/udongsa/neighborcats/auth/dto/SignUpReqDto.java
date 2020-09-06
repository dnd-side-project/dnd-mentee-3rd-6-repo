package org.dnd3.udongsa.neighborcats.auth.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SignUpReqDto {

  @NotBlank
  private String phoneNumber;
  
  @NotBlank
  private String name;
  
  @Email
  private String email;
  
  @NotBlank
  private String password;
  
  @NotNull
  private Boolean isServant;
  
  @NotBlank
  private String nickName;
  
  @NotBlank
  private String addressDepth1;
  
  @NotBlank
  private String addressDepth2;
  
  @NotBlank
  private String addressDepth3;
  
  @NotNull
  private String addressDepth4;
  
  private String catName;

  private String catFeatures;
  
  private Long catKindId;
  
  private EGender catGender;
  
  private String catBirthday;
  
  private ENeutralized catNeutralized;

  private MultipartFile catProfileImg;

  private Double catWeight;

}