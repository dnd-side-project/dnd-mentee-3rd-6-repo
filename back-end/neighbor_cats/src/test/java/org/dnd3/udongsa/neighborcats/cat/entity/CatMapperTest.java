package org.dnd3.udongsa.neighborcats.cat.entity;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

public class CatMapperTest {

  private CatMapper catMapper;

  @BeforeEach
  public void setup(){
    this.catMapper = new CatMapper();
  }

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
    assertEquals(dto.getCatName(), cat.getName());
    assertEquals(dto.getCatFeatures(), cat.getFeatures());
    assertEquals(dto.getCatGender(), cat.getGender());
    assertTrue(LocalDate.parse(dto.getCatBirthday(), DateTimeFormatter.ISO_LOCAL_DATE).isEqual(cat.getBirthday()), "생일이 일치해야 합니다.");
    assertEquals(kind.getName(), cat.getKind().getName());
    assertEquals(dto.getCatNeutralized(), cat.getNeutralized());
    assertEquals(servant, cat.getServant());
  }

  @Test
  public void Given_Cat_When_Map_Return_CatDto(){
    // Given
    Cat cat = CatTestBuilder.build("냥이테스트", null);
    // When
    CatDto catDto = catMapper.map(cat);
    // Then
    assertThat(catDto.getName()).isEqualTo(cat.getName());
    assertThat(catDto.getId()).isEqualTo(cat.getId());
    assertThat(catDto.getFeatures()).isEqualTo(cat.getFeatures());
    assertThat(catDto.getKind()).isEqualTo(cat.getKind());
    assertThat(catDto.getBirthday()).isEqualTo(cat.getBirthday());
    assertThat(catDto.getNeutralized()).isEqualTo(cat.getNeutralized());
    assertThat(catDto.getWeight()).isEqualTo(cat.getWeight());
    assertThat(catDto.getProfileImgUrl()).contains("0");
  }
  
}