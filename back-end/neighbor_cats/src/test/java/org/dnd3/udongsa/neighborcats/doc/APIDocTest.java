package org.dnd3.udongsa.neighborcats.doc;

import org.dnd3.udongsa.neighborcats.auth.AuthController;
import org.dnd3.udongsa.neighborcats.auth.service.AuthService;
import org.dnd3.udongsa.neighborcats.catkind.CatKindController;
import org.dnd3.udongsa.neighborcats.catkind.service.CatKindService;
import org.dnd3.udongsa.neighborcats.imgfile.controller.BasicImgFileController;
import org.dnd3.udongsa.neighborcats.imgfile.service.BasicImgFileService;
import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@ActiveProfiles("test")
@WebMvcTest(controllers = {
  AuthController.class,
  CatKindController.class,
  BasicImgFileController.class
})
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class APIDocTest {

  @Autowired protected MockMvc mockMvc;

  protected String documentName = "{ClassName}/{methodName}";

  @MockBean protected UserDetailsService userDetailsService;
  @MockBean protected PasswordEncoder passwordEncoder;
  @MockBean protected AuthService authService;
  @MockBean protected JwtUtils jwtUtils;
  @MockBean protected CatKindService catKindService;
  @MockBean protected BasicImgFileService basicImgFileService;

  @Test
  public void init(){}

}