package org.dnd3.udongsa.neighborcats.auth.dto;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SignUpReqDto {

    private String phoneNumber;
    private String name;
    private String email;
    private String password;
    private Boolean isServant;
    private String nickName;
    private String address;
    private String catName;
    private String catFeatures;
    private Long catKindId;
    private EGender gender;
    private LocalDate catBirthday;
    private ENeutralized catNeutralized;

}