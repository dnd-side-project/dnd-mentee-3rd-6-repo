package org.dnd3.udongsa.neighborcats.cat.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
    .addressDepth1("부산광역시")
    .addressDepth2("해운대구")
    .addressDepth3("재송동")
    .addressDepth4("")
    .catName("연탄이")
    .catFeatures("말많음")
    .catKindId(1L)
    .catGender(EGender.MALE)
    .catBirthday("2020-01-02")
    .catNeutralized(ENeutralized.NONE)
    .build();
    CatKind kind = CatKind.of("노르웨이숲고양이");
    Servant servant = new Servant();

    // when
    Cat cat = CatMapper.map(dto, kind, servant);

    // then
    assertEquals(dto.getName(), cat.getName());
    assertEquals(dto.getCatFeatures(), cat.getFeatures());
    assertEquals(dto.getCatGender(), cat.getGender());
    assertTrue(LocalDate.parse(dto.getCatBirthday(), DateTimeFormatter.ISO_LOCAL_DATE).isEqual(cat.getBirthday()), "생일이 일치해야 합니다.");
    assertEquals(kind.getName(), cat.getKind().getName());
    assertEquals(dto.getCatNeutralized(), cat.getNeutralized());
    assertEquals(servant, cat.getServant());

  }
  
}