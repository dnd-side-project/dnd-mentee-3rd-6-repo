package org.dnd3.udongsa.neighborcats.servant.service;

import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantTestBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
public class ServantServiceTest {

  private ServantService servantService;
  @InjectMocks
  private ServantServiceImpl servantServiceImpl;
  @Mock
  private SecurityContextService securityContextService;
  @Mock
  private ServantMapper servantMapper;

  @BeforeEach
  public void setup(){
    this.servantService = this.servantServiceImpl;
  }

  @Test
  @DisplayName("GetMe 테스트")
  public void When_GetMe(){
    // Given
    Servant servant = ServantTestBuilder.build("집사1");
    given(securityContextService.getLoggedUser()).willReturn(servant);
    ServantDto servantDto = new ServantDto();
    given(servantMapper.map(servant)).willReturn(servantDto);

    // When
    ServantDto meDto = servantService.getMe();
    assertThat(meDto).isEqualTo(servantDto);

  }
}
