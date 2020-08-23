package org.dnd3.udongsa.neighborcats.servant.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.entity.EGender;
import org.dnd3.udongsa.neighborcats.cat.entity.ENeutralized;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.junit.jupiter.api.Test;

public class ServantMapperTest {

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

    Servant servant = ServantMapper.map(dto, role, encodedPassword, address);

    assertEquals(dto.getPhoneNumber(), servant.getPhoneNumber());
    assertEquals(dto.getName(), servant.getName());
    assertEquals(dto.getEmail(), servant.getEmail());
    assertEquals(encodedPassword, servant.getPassword());
    assertEquals(dto.getIsServant(), servant.getIsServant());
    assertEquals(dto.getNickName(), servant.getNickname());
    assertEquals(address, servant.getAddress());
    assertEquals(true, servant.getRoles().contains(role));
    
    
  }
  
}