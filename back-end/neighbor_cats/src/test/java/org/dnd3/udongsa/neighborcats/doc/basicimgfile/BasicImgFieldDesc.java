package org.dnd3.udongsa.neighborcats.doc.basicimgfile;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

import java.util.ArrayList;
import java.util.List;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;


public class BasicImgFieldDesc {

	public static List<FieldDescriptor> uploadServantResDesc() {
    List<FieldDescriptor> fields = new ArrayList<>();
    fields.add(fieldWithPath("imgFileUrl").type(JsonFieldType.STRING).description("이미지 파일 URL"));
		return fields;
	}

}
