// package org.dnd3.udongsa.neighborcats.auth;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;

// import java.util.Optional;

// import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
// import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
// import org.dnd3.udongsa.neighborcats.auth.service.SignInService;
// import org.dnd3.udongsa.neighborcats.auth.service.SignInServiceImpl;
// import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
// import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
// import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
// import org.dnd3.udongsa.neighborcats.servant.entity.ServantTestUtils;
// import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @ExtendWith(MockitoExtension.class)
// public class SignInServiceTest {

//   private SignInService signInService;

//   @Mock
//   private ServantRepository servantRepo;
//   @Mock
//   private PasswordEncoder encoder;
//   @Mock
//   private JwtUtils jwtUtils;
//   @Mock
//   private SecurityContextService securityContextService;


//   @BeforeEach
//   public void setup(){
//     this.signInService = 
//       new SignInServiceImpl(servantRepo, jwtUtils, encoder, securityContextService);
//   }  

//   @Test
//   public void WhenSignInReturnedUserInfoAndToken(){
//     // Given
//     Servant servant = ServantTestUtils.generateDefault();
//     SignInReqDto reqDto = new SignInReqDto();
//     reqDto.setEmail(servant.getEmail());
//     reqDto.setPassword(servant.getPassword());
//     when(servantRepo.findByEmail(servant.getEmail())).thenReturn(Optional.of(servant));
//     when(encoder.matches(any(), any())).thenReturn(true);
//     when(jwtUtils.generateJwtToken(any(String.class))).thenReturn("accessToken123");
//     // When
//     SignInResDto result = signInService.signIn(reqDto);
//     // Then
//     assertEquals("accessToken123", result.getAccessToken());
//     assertEquals(servant.getName(), result.getName());
//     assertEquals(servant.getNickname(), result.getNickName());
//     assertEquals(servant.getEmail(), result.getEmail());
//     assertEquals(servant.getAddress().getName(), result.getAddressName());
//     assertEquals(servant.getPhoneNumber(), result.getPhoneNumber());
//     assertEquals("", result.getProfileImgUrl());
//   }
// }