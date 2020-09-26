package org.dnd3.udongsa.neighborcats.servant.entity;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.CatMapper;
import org.dnd3.udongsa.neighborcats.cat.entity.CatTestBuilder;
import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
public class ServantMapperTest {

  private ServantMapper mapper;
  @Mock
  private CatMapper catMapper;

  @BeforeEach
  public void setup(){
    this.mapper = new ServantMapper(catMapper);
  }

  @Test
  public void Given_SignUpDto_When_Mapping_Then_Returned_Servant(){

    SignUpReqDto dto = SignUpReqDto.builder()
    .phoneNumber("0101231234")
    .name("홍길동")
    .email("abc@mail.com")
    .password("pw123")
    .isServant(true)
    .nickName("연탄이네")
    .catName("연탄이")
    .addressDepth1("부산광역시")
    .addressDepth2("해운대구")
    .addressDepth3("재송동")
    .addressDepth4("")
    .catFeatures("말많음")
    .catKindId(1L)
    .catGender(EGender.MALE)
    .catBirthday("2020-01-22")
    .catNeutralized(ENeutralized.NONE)
    .build();

    Role role = new Role();
    String encodedPassword = "asdfasdf";

    Address address = Address.of(dto.getAddressDepth1(), dto.getAddressDepth2(), dto.getAddressDepth3(), dto.getAddressDepth4());
    ImgFile profileImg = ImgFile.of("filePath", "fileName", "ext");
    Servant servant = mapper.map(dto, role, encodedPassword, address, profileImg);

    assertEquals(dto.getPhoneNumber(), servant.getPhoneNumber());
    assertEquals(dto.getName(), servant.getName());
    assertEquals(dto.getEmail(), servant.getEmail());
    assertEquals(encodedPassword, servant.getPassword());
    assertEquals(dto.getIsServant(), servant.getIsServant());
    assertEquals(dto.getNickName(), servant.getNickname());
    assertEquals(address, servant.getAddress());
    assertTrue(servant.getRoles().contains(role));
  }

  @Test
  public void Given_Servant_When_Map_Then_Return_ServantDto(){
    Servant servant = ServantTestBuilder.build("테스트유저1");
    given(catMapper.map(any())).willReturn(CatTestBuilder.build(1L, "테스트냥이"));

    ServantDto dto = mapper.map(servant);

    assertEqualServantInfo(dto, servant);
    List<CatDto> catDtoList = dto.getCats();
    assertThat(catDtoList).hasSize(servant.getCats().size());
    catDtoList.forEach(catDto -> {
      assertThat(catDto.getId()).isEqualTo(1L);
      assertThat(catDto.getName()).isEqualTo("테스트냥이");
    });
  }

  @Test
  public void Given_nonCats_When_Map_Then_Return_With_Empty_Cats(){
    Servant servant = ServantTestBuilder.build("테스트유저1");
    servant.getCats().clear();

    ServantDto dto = mapper.map(servant);

    assertEqualServantInfo(dto, servant);
    assertThat(dto.getCats()).hasSize(0);
  }

  private void assertEqualServantInfo(ServantDto dto, Servant servant){
    assertThat(dto.getId()).isEqualTo(servant.getId());
    assertThat(dto.getName()).isEqualTo(servant.getName());
    assertThat(dto.getEmail()).isEqualTo(servant.getEmail());
    assertThat(dto.getNickname()).isEqualTo(servant.getNickname());
    assertThat(dto.getProfileImgUrl()).contains("0");
    assertThat(dto.getAddressName()).isEqualTo(servant.getAddress().getName());
    assertThat(dto.getIsServant()).isEqualTo(servant.getIsServant());
    assertThat(dto.getRoles()).isEqualTo(servant.getRoles());
  }
  
}