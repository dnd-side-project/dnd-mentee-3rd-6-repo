package org.dnd3.udongsa.neighborcats.doc.servant;

import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.CatTestBuilder;
import org.dnd3.udongsa.neighborcats.doc.APIDocTest;
import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentResponse;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ServantDoc extends APIDocTest {

  @Test
  public void getMe() throws Exception{
    // Given
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer abc123token");

    ServantDto meDto = new ServantDto();
    meDto.setId(1L);
    meDto.setName("홍길동");
    meDto.setEmail("mail@mail.com");
    meDto.setNickname("연탄이네");
    meDto.setProfileImgUrl("https://woodongjip.com/img-files/1");
    meDto.setAddressName("부산광역시 해운대구 센텀대로");
    meDto.setIsServant(true);
    List<CatDto> cats = new ArrayList<>();
    cats.add(CatTestBuilder.build(1L,"연탄이1"));
    cats.add(CatTestBuilder.build(2L,"연탄이2"));
    meDto.setCats(cats);
    given(servantService.getMe()).willReturn(meDto);

    // When
    ResultActions action = mockMvc.perform(get("/api/servants/me")
                                              .headers(httpHeaders));

    // Then
    action
      .andExpect(status().isOk())
      .andDo(document(documentName
                      ,requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("Bearer token123"))
                      ,responseHeaders(headerWithName(HttpHeaders.CONTENT_TYPE).description("application/json"))))
      .andDo(document(documentName
                      ,getDocumentResponse()
                      ,responseFields(ServantFieldDesc.meResponse())));


  }

}
