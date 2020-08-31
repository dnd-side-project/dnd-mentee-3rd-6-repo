package org.dnd3.udongsa.neighborcats.doc.basicimgfile;

import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentRequest;
import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.dnd3.udongsa.neighborcats.doc.APIDocTest;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileUrlDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class BasicImgFileDoc extends APIDocTest {
  
  @Test
  @WithMockUser(authorities = {"ROLE_ADMIN"})
  public void uploadServant() throws Exception {
    String api = "/api/base-img-files/servant";
    MockMultipartFile baseImgFile = new MockMultipartFile("baseImgFile", new byte[1]);
    String imgfileUrl = "/api/imgfiles/1";
    ImgFileUrlDto resDto = new ImgFileUrlDto(imgfileUrl);
    when(basicImgFileService.uploadServant(any())).thenReturn(resDto);

    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.AUTHORIZATION, "Bearer {accessToken}");

    ResultActions action = mockMvc.perform(MockMvcRequestBuilders.multipart(api)
      .file(baseImgFile).headers(headers));

      action
      .andExpect(status().isOk())
      .andDo(document(documentName, 
        requestHeaders(headerWithName("Content-Type").description("multipart/form-data")),
        responseHeaders(headerWithName("Content-Type").description("application/json"))
      ))
      .andDo(document(documentName,
        getDocumentRequest(),
        getDocumentResponse(),
        requestParts(partWithName("baseImgFile").description("기본 집사 프로필 이미지 파일")),
        responseFields(BasicImgFieldDesc.uploadServantResDesc())));

  }

}