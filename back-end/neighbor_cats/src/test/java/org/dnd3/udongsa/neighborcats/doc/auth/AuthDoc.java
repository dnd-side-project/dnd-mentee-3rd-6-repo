package org.dnd3.udongsa.neighborcats.doc.auth;

import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentRequest;
import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.dnd3.udongsa.neighborcats.auth.dto.LoggedServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;
import org.dnd3.udongsa.neighborcats.doc.APIDocTest;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;

public class AuthDoc extends APIDocTest {

  @Test
  public void signIn() throws JsonProcessingException, Exception {
    // Given
    String api = "/api/auth/sign-in";
    String userEmail = "admin@test.com";
    String password = "1234";

    SignInReqDto reqDto = new SignInReqDto();
    reqDto.setEmail(userEmail);
    reqDto.setPassword(password);

    SignInResDto resDto = new SignInResDto("efe8331f-2f30-4c1a-9994-6af08fb3b949");
    Mockito.when(super.authService.signIn(any())).thenReturn(resDto);

    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

    // When
    ResultActions action = mockMvc.perform(post(api)
    .content(new ObjectMapper().writeValueAsString(reqDto))
    .headers(headers));

    // Then
    action
    .andExpect(status().isOk())
    .andDo(document(documentName, 
                    requestHeaders(headerWithName("Content-Type").description("application/json")),
                    responseHeaders(headerWithName("Content-Type").description("application/json"))))
    .andDo(document(documentName, 
                      getDocumentRequest(), 
                      getDocumentResponse(),
                      requestFields(AuthFieldDesc.getSignInReqDesc()),
                      responseFields(AuthFieldDesc.getSignInResDesc())));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  public void me() throws Exception{
    // Given
    String api = "/api/auth/me";
    
    LoggedServantDto dto = new LoggedServantDto();
    dto.setId(0L);
    dto.setName("name");
    dto.setEmail("email@mail.com");
    dto.setAddress("Busan");
    dto.setNickName("nickName");
    dto.setPhoneNumber("0101234567");
    Role userRole = new Role(1, ERole.ROLE_ADMIN);
    dto.getRoles().add(userRole);
    CatDto catDto = new CatDto();
    catDto.setId(1L);
    catDto.setName("연탄");
    catDto.setFeatures("말많음");
    catDto.setKindName("페르시안");
    catDto.setGender(EGender.MALE);
    catDto.setBirthday(LocalDate.of(2020,1,2));
    catDto.setNeutralized(ENeutralized.FALSE);
    catDto.setProfileImgUrl("/api/imgfiles/1");
    List<CatDto> cats = new ArrayList<>();
    cats.add(catDto);
    dto.setCats(cats);


    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
    headers.add(HttpHeaders.AUTHORIZATION, "Bearer {accessToken}");

    when(authService.getLoggedServant()).thenReturn(dto);

    // When
    ResultActions action = mockMvc.perform(get(api).headers(headers));

    // Then
    action
    .andDo(print())
    .andExpect(status().isOk())
    .andDo(document(documentName, 
      requestHeaders(headerWithName("Content-Type").description("application/json"))
      ,responseHeaders(headerWithName("Content-Type").description("application/json"))
    ))
    .andDo(document(documentName,
      getDocumentRequest(),
      getDocumentResponse(),
      responseFields(AuthFieldDesc.getMeResDesc())));
  }

}