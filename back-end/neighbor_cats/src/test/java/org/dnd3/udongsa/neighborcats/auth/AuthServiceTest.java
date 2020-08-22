package org.dnd3.udongsa.neighborcats.auth;

import org.dnd3.udongsa.neighborcats.cat.repository.CatRepository;
import org.dnd3.udongsa.neighborcats.catkind.CatKindRepository;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImgRepository;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.dnd3.udongsa.neighborcats.role.RoleRepository;
import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

// @ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

  private AuthService authService;
  @MockBean private ServantRepository servantRepo;
  @MockBean private RoleRepository roleRepository;
  @MockBean private PasswordEncoder encoder;
  @MockBean private JwtUtils jwtUtils;
  @MockBean private UserDetailsService userDetailsService;
  @MockBean private CatKindRepository catKindRepo;
  @MockBean private CatRepository catRepo;
  @MockBean private ImgFileService imgFileService;
  @MockBean private CatProfileImgRepository catProfileRepo;

  // @BeforeEach
  public void init(){
  }

  // @Test
  public void getMeTest(){
    // given

    // when
    //then
  }
  
}