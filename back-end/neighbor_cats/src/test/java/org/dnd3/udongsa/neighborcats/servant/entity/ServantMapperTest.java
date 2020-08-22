package org.dnd3.udongsa.neighborcats.servant.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

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
    .address("부산광역시 해운대구 우동")
    .catName("연탄이")
    .catFeatures("말많음")
    .catKindId(1L)
    .catGender(EGender.MALE)
    .catBirthday(LocalDate.of(2020, 1, 22))
    .catNeutralized(ENeutralized.NONE)
    .build();

    Role role = new Role();

    Servant servant = ServantMapper.map(dto, role);

    assertEquals(dto.getPhoneNumber(), servant.getPhoneNumber());
    assertEquals(dto.getName(), servant.getName());
    assertEquals(dto.getEmail(), servant.getEmail());
    assertEquals(dto.getPassword(), servant.getPassword());
    assertEquals(dto.getIsServant(), servant.getIsServant());
    assertEquals(dto.getNickName(), servant.getNickname());
    assertEquals(dto.getAddress(), servant.getAddress());
    assertEquals(true, servant.getRoles().contains(role));
    
    
  }
  
}