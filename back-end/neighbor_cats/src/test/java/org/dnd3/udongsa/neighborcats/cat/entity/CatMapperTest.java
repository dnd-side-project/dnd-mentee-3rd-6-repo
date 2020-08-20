package org.dnd3.udongsa.neighborcats.cat.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.junit.jupiter.api.Test;

public class CatMapperTest {

  @Test
  public void Given_SignUpReqDto_When_Mapping_Then_Returned_Cat(){
    // given
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
    .gender(EGender.MALE)
    .catBirthday(LocalDate.of(2020, 1, 22))
    .catNeutralized(ENeutralized.NONE)
    .build();
    CatKind kind = CatKind.of("노르웨이숲고양이");
    Servant servant = new Servant();

    // when
    Cat cat = CatMapper.map(dto, kind, servant);

    // then
    assertEquals(dto.getName(), cat.getName());
    assertEquals(dto.getCatFeatures(), cat.getFeatures());
    assertEquals(dto.getGender(), cat.getGender());
    assertEquals(dto.getCatBirthday(), cat.getBirthday());
    assertEquals(kind.getName(), cat.getKind().getName());
    assertEquals(dto.getCatNeutralized(), cat.getNeutralized());
    assertEquals(servant, cat.getServant());

  }
  
}