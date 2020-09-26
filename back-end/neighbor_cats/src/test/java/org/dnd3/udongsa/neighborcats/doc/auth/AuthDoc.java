// package org.dnd3.udongsa.neighborcats.doc.auth;
//
// import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentRequest;
// import static org.dnd3.udongsa.neighborcats.doc.ApiDocUtils.getDocumentResponse;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;
// import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
// import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
// import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
// import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
// import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
// import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
// import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
// import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
// import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
// import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
// import java.util.HashSet;
// import java.util.Set;
//
// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;
//
// import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
// import org.dnd3.udongsa.neighborcats.auth.dto.MeInfo;
// import org.dnd3.udongsa.neighborcats.doc.APIDocTest;
// import org.dnd3.udongsa.neighborcats.role.ERole;
// import org.dnd3.udongsa.neighborcats.role.Role;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.mock.web.MockMultipartFile;
// import org.springframework.test.web.servlet.ResultActions;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.util.LinkedMultiValueMap;
// import org.springframework.util.MultiValueMap;
//
// public class AuthDoc extends APIDocTest {
//
//   @Test
//   public void signIn() throws JsonProcessingException, Exception {
//     // Given
//     String api = "/api/auth/sign-in";
//     String userEmail = "admin@test.com";
//     String password = "1234";
//
//     SignInReqDto reqDto = new SignInReqDto();
//     reqDto.setEmail(userEmail);
//     reqDto.setPassword(password);
//
//     MeInfo resDto = new MeInfo();
//     // resDto.setAccessToken("abc1234def");
//     resDto.setId(1L);
//     resDto.setName("홍길동");
//     resDto.setEmail("email@mail.com");
//     resDto.setAddressName("부산광역시 해운대구 반여동");
//     resDto.setPhoneNumber("01012345678");
//     resDto.setProfileImgUrl("/img-files/1");
//     resDto.setIsServant(true);
//     Set<Role> roles = new HashSet<>();
//     roles.add(Role.of(ERole.ROLE_USER));
//     resDto.setRoles(roles);
//     Mockito.when(super.authService.signIn(any())).thenReturn(resDto);
//
//     HttpHeaders headers = new HttpHeaders();
//     headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
//
//     // When
//     ResultActions action = mockMvc.perform(post(api)
//                                   .content(new ObjectMapper().writeValueAsString(reqDto))
//                                   .headers(headers));
//
//     // Then
//     action
//     .andExpect(status().isOk())
//     .andDo(document(documentName,
//                     requestHeaders(headerWithName("Content-Type").description("application/json")),
//                     responseHeaders(headerWithName("Content-Type").description("application/json"))))
//     .andDo(document(documentName,
//                       getDocumentRequest(),
//                       getDocumentResponse(),
//                       requestFields(AuthFieldDesc.getSignInReqDesc()),
//                       responseFields(AuthFieldDesc.getSignResDesc())));
//   }
//
//   // @Test
//   // @WithMockUser(authorities = {"ROLE_USER"})
//   // public void me() throws Exception{
//   //   // Given
//   //   String api = "/api/auth/me";
//
//   //   ServantDto dto = new ServantDto();
//   //   dto.setId(0L);
//   //   dto.setName("name");
//   //   dto.setEmail("email@mail.com");
//   //   dto.setAddressName("Busan");
//   //   dto.setNickName("nickName");
//   //   dto.setPhoneNumber("0101234567");
//   //   Role userRole = Role.of(ERole.ROLE_ADMIN);
//   //   dto.getRoles().add(userRole);
//   //   CatDto catDto = new CatDto();
//   //   catDto.setId(1L);
//   //   catDto.setName("연탄");
//   //   catDto.setFeatures("말많음");
//   //   catDto.setKindName("페르시안");
//   //   catDto.setGender(EGender.MALE);
//   //   catDto.setBirthday(LocalDate.of(2020,1,2));
//   //   catDto.setNeutralized(ENeutralized.FALSE);
//   //   catDto.setProfileImgUrl("/api/imgfiles/1");
//   //   List<CatDto> cats = new ArrayList<>();
//   //   cats.add(catDto);
//   //   dto.setCats(cats);
//
//
//   //   HttpHeaders headers = new HttpHeaders();
//   //   headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
//   //   headers.add(HttpHeaders.AUTHORIZATION, "Bearer {accessToken}");
//
//   //   when(authService.getLoggedServant()).thenReturn(dto);
//
//   //   // When
//   //   ResultActions action = mockMvc.perform(get(api).headers(headers));
//
//   //   // Then
//   //   action
//   //   .andDo(print())
//   //   .andExpect(status().isOk())
//   //   .andDo(document(documentName,
//   //     requestHeaders(headerWithName("Content-Type").description("application/json"))
//   //     ,responseHeaders(headerWithName("Content-Type").description("application/json"))
//   //   ))
//   //   .andDo(document(documentName,
//   //     getDocumentRequest(),
//   //     getDocumentResponse(),
//   //     responseFields(AuthFieldDesc.getMeResDesc())));
//   // }
//
//   @Test
//   public void signUp() throws Exception{
//     String api = "/api/auth/sign-up";
//
//     MockMultipartFile catProfileImg = new MockMultipartFile("catProfileImg", new byte[1]);
//     MultiValueMap<String, String> reqMap = new LinkedMultiValueMap<>();
//     reqMap.add("phoneNumber", "01012345678");
//     reqMap.add("name", "홍길동");
//     reqMap.add("email", "abc@mail.com");
//     reqMap.add("password", "password");
//     reqMap.add("isServant", "true");
//     reqMap.add("nickName", "집사개발");
//     reqMap.add("addressDepth1", "부산광역시");
//     reqMap.add("addressDepth2", "해운대구");
//     reqMap.add("addressDepth3", "재송동");
//     reqMap.add("addressDepth3", "재송동");
//     reqMap.add("addressDepth4", "");
//     reqMap.add("catName", "해");
//     reqMap.add("catFeatures", "잠이많");
//     reqMap.add("catKindId", "1");
//     reqMap.add("catGender", "MALE");
//     reqMap.add("catBirthday", "2019-01-02");
//     reqMap.add("catNeutralized", "TRUE");
//     reqMap.add("catWeight", "3.5");
//
//     MeInfo resDto = new MeInfo();
//     resDto.setId(1L);
//     resDto.setPhoneNumber("01012345678");
//     resDto.setName("홍길동");
//     resDto.setEmail("abc@mail.com");
//     resDto.setIsServant(true);
//     resDto.setNickName("냥이집");
//     resDto.setAddressName("부산광역시 해운대구 재송동");
//     resDto.setProfileImgUrl("/img-files/1");
//     resDto.setAccessToken("1234abcdef");
//     Set<Role> roles = new HashSet<>();
//     roles.add(Role.of(ERole.ROLE_USER));
//     resDto.setRoles(roles);
//     when(authService.signUp(any())).thenReturn(resDto);
//
//     // When
//     ResultActions action = mockMvc.perform(MockMvcRequestBuilders.multipart(api)
//                                     .file(catProfileImg)
//                                     .params(reqMap)
//     );
//
//     // Then
//     action
//     .andExpect(status().isCreated())
//     .andDo(document(documentName,
//       requestHeaders(headerWithName("Content-Type").description("multipart/form-data"))
//       ,responseHeaders(headerWithName("Content-Type").description("application/json"))
//     ))
//     .andDo(document(documentName,
//       getDocumentRequest(),
//       getDocumentResponse(),
//       requestParameters(AuthFieldDesc.getSignUpReqDesc()),
//       requestParts(partWithName("catProfileImg").description("고양이 프로필 이미지 파일")),
//       responseFields(AuthFieldDesc.getSignResDesc())));
//
//   }
//
// }