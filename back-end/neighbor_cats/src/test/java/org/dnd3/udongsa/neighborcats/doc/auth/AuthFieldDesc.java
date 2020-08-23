package org.dnd3.udongsa.neighborcats.doc.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public class AuthFieldDesc {
  
  public static List<FieldDescriptor> getSignInReqDesc(){
    List<FieldDescriptor> fields = new ArrayList<>();
    fields.add(fieldWithPath("email").type(JsonFieldType.STRING).description("로그인 이메일"));
    fields.add(fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"));
    return fields;
  }

  public static List<FieldDescriptor> getSignInResDesc(){
    List<FieldDescriptor> fields = new ArrayList<>();
    fields.add(fieldWithPath("accessToken").type(JsonFieldType.STRING).description("인증 토큰"));
    return fields;
  }

public static List<FieldDescriptor> getMeResDesc() {
  List<FieldDescriptor> fields = new ArrayList<>();
  fields.add(fieldWithPath("id").type(JsonFieldType.NUMBER).description("식별자"));
  fields.add(fieldWithPath("name").type(JsonFieldType.STRING).description("실명"));
  fields.add(fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"));
  fields.add(fieldWithPath("nickName").type(JsonFieldType.STRING).description("별명"));
  fields.add(fieldWithPath("addressName").type(JsonFieldType.STRING).description("주소지"));
  fields.add(fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("전화번호"));
  fields.add(fieldWithPath("roles[].id").type(JsonFieldType.NUMBER).description("Role 식별자"));
  fields.add(fieldWithPath("roles[].name").type(JsonFieldType.STRING).description("Role 명칭"));
  fields.add(fieldWithPath("cats[].id").type(JsonFieldType.NUMBER).description("Cat 식별자"));
  fields.add(fieldWithPath("cats[].name").type(JsonFieldType.STRING).description("Cat 이름"));
  fields.add(fieldWithPath("cats[].features").type(JsonFieldType.STRING).description("Cat 특징"));
  fields.add(fieldWithPath("cats[].kindName").type(JsonFieldType.STRING).description("Cat 품종"));
  fields.add(fieldWithPath("cats[].gender").type(JsonFieldType.STRING).description("Cat 성별"));
  fields.add(fieldWithPath("cats[].birthday").type(JsonFieldType.STRING).description("Cat 생일"));
  fields.add(fieldWithPath("cats[].neutralized").type(JsonFieldType.STRING).description("Cat 품종"));
  fields.add(fieldWithPath("cats[].profileImgUrl").type(JsonFieldType.VARIES).description("Cat 프로필 이미지 URL"));
  return fields;
}

public static List<ParameterDescriptor> getSignUpReqDesc() {
  List<ParameterDescriptor> fields = new ArrayList<>();
  fields.add(parameterWithName("phoneNumber").description("폰번호"));
  fields.add(parameterWithName("name").description("실명"));
  fields.add(parameterWithName("email").description("이메일"));
  fields.add(parameterWithName("password").description("비밀번호"));
  fields.add(parameterWithName("isServant").description("집사인지 아닌지"));
  fields.add(parameterWithName("nickName").description("별칭"));
  fields.add(parameterWithName("addressDepth1").description("주소지 Depth1"));
  fields.add(parameterWithName("addressDepth2").description("주소지 Depth2"));
  fields.add(parameterWithName("addressDepth3").description("주소지 Depth3"));
  fields.add(parameterWithName("addressDepth4").description("주소지 Depth4(없을 경우, 공란)"));
  fields.add(parameterWithName("catName").description("Cat 이름"));
  fields.add(parameterWithName("catFeatures").description("Cat 특징"));
  fields.add(parameterWithName("catKindId").description("Cat 품종 아이디"));
  fields.add(parameterWithName("catGender").description("Cat 성별"));
  fields.add(parameterWithName("catBirthday").description("Cat 생일"));
  fields.add(parameterWithName("catNeutralized").description("Cat 중성화했는지"));
  return fields;
}

public static List<FieldDescriptor> getSignUpResDesc() {
  List<FieldDescriptor> fields = new ArrayList<>();
  fields.add(fieldWithPath("servantId").type(JsonFieldType.NUMBER).description("집사 식별자"));
  fields.add(fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("폰번호"));
  fields.add(fieldWithPath("name").type(JsonFieldType.STRING).description("실명"));
  fields.add(fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"));
  fields.add(fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"));
  fields.add(fieldWithPath("isServant").type(JsonFieldType.BOOLEAN).description("집사인지 아닌지"));
  fields.add(fieldWithPath("nickName").type(JsonFieldType.STRING).description("별칭"));
  fields.add(fieldWithPath("addressName").type(JsonFieldType.STRING).description("주소지"));
  fields.add(fieldWithPath("catId").type(JsonFieldType.NUMBER).description("Cat 식별자"));
  fields.add(fieldWithPath("catName").type(JsonFieldType.STRING).description("Cat 이름"));
  fields.add(fieldWithPath("catFeatures").type(JsonFieldType.STRING).description("Cat 특징"));
  fields.add(fieldWithPath("catKindId").type(JsonFieldType.NUMBER).description("Cat 품종 아이디"));
  fields.add(fieldWithPath("catGender").type(JsonFieldType.STRING).description("Cat 성별"));
  fields.add(fieldWithPath("catBirthday").type(JsonFieldType.STRING).description("Cat 생일/형식 yyyy-MM-dd"));
  fields.add(fieldWithPath("catNeutralized").type(JsonFieldType.VARIES).description("Cat 중성화했는지"));
  fields.add(fieldWithPath("accessToken").type(JsonFieldType.STRING).description("인증 토큰"));
  fields.add(fieldWithPath("catProfileImgUrl").type(JsonFieldType.STRING).description("고양이 프로필 이미지 URL"));
  return fields;
}
}