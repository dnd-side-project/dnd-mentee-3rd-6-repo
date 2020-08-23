package org.dnd3.udongsa.neighborcats.doc.catkind;

import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentRequest;
import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.catkind.CatKindDto;
import org.dnd3.udongsa.neighborcats.doc.APIDocTest;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;
import org.springframework.test.web.servlet.ResultActions;

public class CatKindDoc extends APIDocTest {

  @Test
  public void getAll() throws Exception {
    // Given
    String api = "/api/cat-kinds";
    List<CatKindDto> kinds = new ArrayList<>();
    kinds.add(new CatKindDto(1L, "페르시안"));
    kinds.add(new CatKindDto(2L, "노르웨이숲"));
    when(catKindService.getAll(any(Sort.class))).thenReturn(kinds);

    // When
    ResultActions action = mockMvc.perform(get(api).param("sort", "name,asc"));
    
    // Then
    action.andExpect(status().isOk())
    .andDo(document(documentName, 
      getDocumentRequest(),
      getDocumentResponse(),
      requestParameters(CatKindFieldDesc.getAllReq()),
      responseFields(fieldWithPath("[]").description("품종 배열")).andWithPrefix("[].", CatKindFieldDesc.getAllRes())));
  }
  
}