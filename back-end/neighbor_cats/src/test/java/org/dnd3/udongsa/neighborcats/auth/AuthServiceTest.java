// package org.dnd3.udongsa.neighborcats.auth;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;

// import org.dnd3.udongsa.neighborcats.address.Address;
// import org.dnd3.udongsa.neighborcats.address.repository.AddressRepository;
// import org.dnd3.udongsa.neighborcats.auth.dto.SignResDto;
// import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
// import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;
// import org.dnd3.udongsa.neighborcats.auth.service.AuthService;
// import org.dnd3.udongsa.neighborcats.auth.service.AuthServiceImpl;
// import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
// import org.dnd3.udongsa.neighborcats.cat.entity.CatTestUtils;
// import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;
// import org.dnd3.udongsa.neighborcats.cat.repository.CatRepository;
// import org.dnd3.udongsa.neighborcats.cat.service.CatService;
// import org.dnd3.udongsa.neighborcats.role.RoleRepository;
// import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
// import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
// import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
// import org.dnd3.udongsa.neighborcats.servant.entity.ServantTestUtils;
// import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
// import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.mock.web.MockMultipartFile;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.multipart.MultipartFile;

// @ExtendWith(MockitoExtension.class)
// public class AuthServiceTest {

//   private AuthService authService;
//   private SignUpReqDto signUpReqDto;
//   private String catBirthDay;
//   private String accessToken;
//   private Servant servant;
//   private Cat cat;

//   @Mock private ServantRepository servantRepo;
//   @Mock private RoleRepository roleRepository;

//   @Mock private PasswordEncoder encoder;
//   @Mock private JwtUtils jwtUtils;
//   @Mock private SecurityContextService securityContextService;

//   @Mock private CatRepository catRepo;
//   @Mock private CatService catService;
  
//   @Mock private AddressRepository addressRepo;
//   @Mock private ServantService servantService;

//   @BeforeEach
//   public void setup(){
//     this.authService = 
//       new AuthServiceImpl(jwtUtils, catService, securityContextService, servantService);
//     this.servant = ServantTestUtils.generateDefault();
//     Address address = servant.getAddress();
//     this.cat = CatTestUtils.generateDefault(servant);
//     MultipartFile catProfileImg = new MockMultipartFile("file", new byte[0]);
//     this.catBirthDay = "2020-01-02";
//     this.accessToken = "1234abcde";
//     this.signUpReqDto = new SignUpReqDto(
//       servant.getPhoneNumber(),
//       servant.getName(),
//       servant.getEmail(),
//       servant.getPassword(), 
//       servant.getIsServant(), 
//       servant.getNickname(),
//       address.getDepth1(),
//       address.getDepth2(),
//       address.getDepth3(),
//       address.getDepth4(),
//       cat.getName(),
//       cat.getFeatures(),
//       cat.getKind().getId(),
//       cat.getGender(),
//       catBirthDay,
//       ENeutralized.FALSE,
//       catProfileImg,
//       cat.getWeight());

//   }  

//   @Test
//   public void When_SignUp_Returned_SignUpResDto(){
//     // given
//     SignUpReqDto reqDto = this.signUpReqDto;
//     when(servantService.save(any(), any())).thenReturn(servant);
//     when(jwtUtils.generateJwtToken(any(String.class))).thenReturn(accessToken);

//     // when
//     SignResDto resDto = authService.signUp(reqDto);

//     // then
//     assertEquals(accessToken, resDto.getAccessToken());
//     assertEquals(reqDto.getName(), resDto.getName());
//     assertEquals(reqDto.getEmail(), resDto.getEmail());
//     assertEquals(reqDto.getNickName(), resDto.getNickName());
//     assertEquals(reqDto.getIsServant(), resDto.getIsServant());
//     assertEquals(reqDto.getPhoneNumber(), resDto.getPhoneNumber());

//   }
  
// }