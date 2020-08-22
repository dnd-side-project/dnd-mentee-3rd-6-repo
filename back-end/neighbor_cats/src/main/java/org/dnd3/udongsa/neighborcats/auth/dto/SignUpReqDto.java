package org.dnd3.udongsa.neighborcats.auth.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;

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
  private String address;
  @NotBlank
  private String catName;
  private String catFeatures;
  @NotNull
  private Long catKindId;
  @NotNull
  private EGender catGender;
  @NotNull
  private LocalDate catBirthday;
  @NotNull
  private ENeutralized catNeutralized;

}