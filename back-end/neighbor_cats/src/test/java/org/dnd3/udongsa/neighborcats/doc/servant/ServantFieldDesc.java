package org.dnd3.udongsa.neighborcats.doc.servant;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import java.util.ArrayList;
import java.util.List;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;
import springfox.documentation.spring.web.json.Json;

public class ServantFieldDesc {

  public static List<FieldDescriptor> meResponse(){
    List<FieldDescriptor> fields = new ArrayList<>();
    fields.add(fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 식별자"));
    fields.add(fieldWithPath("name").type(JsonFieldType.STRING).description("본명"));
    fields.add(fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"));
    fields.add(fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"));
    fields.add(fieldWithPath("profileImgUrl").type(JsonFieldType.STRING).description("프로필 이미지 URL"));
    fields.add(fieldWithPath("addressName").type(JsonFieldType.STRING).description("주소지"));
    fields.add(fieldWithPath("isServant").type(JsonFieldType.BOOLEAN).description("집사인지 아닌지"));
    fields.add(fieldWithPath("roles[]").type(JsonFieldType.ARRAY).description("권한"));
    fields.add(fieldWithPath("cats[]").type(JsonFieldType.ARRAY).description("냥이들"));
    fields.add(fieldWithPath("cats[].id").type(JsonFieldType.NUMBER).description("냥이 ID"));
    fields.add(fieldWithPath("cats[].name").type(JsonFieldType.STRING).description("이름"));
    fields.add(fieldWithPath("cats[].features").type(JsonFieldType.STRING).description("특징"));
    fields.add(fieldWithPath("cats[].kind").type(JsonFieldType.OBJECT).description("품종"));
    fields.add(fieldWithPath("cats[].kind.id").type(JsonFieldType.NUMBER).description("품종 ID"));
    fields.add(fieldWithPath("cats[].kind.name").type(JsonFieldType.STRING).description("품종명"));
    fields.add(fieldWithPath("cats[].gender").type(JsonFieldType.STRING).description("성별(MALE,FEMALE)"));
    fields.add(fieldWithPath("cats[].birthday").type(JsonFieldType.STRING).description("생일"));
    fields.add(fieldWithPath("cats[].neutralized").type(JsonFieldType.STRING).description("중성화 여부(TRUE,FALSE,NONE)"));
    fields.add(fieldWithPath("cats[].weight").type(JsonFieldType.NUMBER).description("몸무게"));
    fields.add(fieldWithPath("cats[].profileImgUrl").type(JsonFieldType.STRING).description("프로필 사진 URL"));
    return fields;
  }
}
