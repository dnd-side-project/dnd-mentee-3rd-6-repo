package org.dnd3.udongsa.neighborcats.doc.catkind;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

import java.util.ArrayList;
import java.util.List;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

public class CatKindFieldDesc {

	public static List<ParameterDescriptor> getAllReq() {
    List<ParameterDescriptor> params = new ArrayList<>();
    params.add(parameterWithName("sort").optional().description("정렬, {정렬할 칼럼},{desc/acs}. ex) sort=name,desc"));
		return params;
	}

	public static List<FieldDescriptor> getAllRes() {
    List<FieldDescriptor> fields = new ArrayList<>();
    fields.add(fieldWithPath("id").type(JsonFieldType.NUMBER).description("고유 식별자"));
    fields.add(fieldWithPath("name").type(JsonFieldType.STRING).description("명칭"));
    return fields;
	}

}
