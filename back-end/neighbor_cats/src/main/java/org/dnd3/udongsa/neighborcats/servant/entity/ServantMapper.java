package org.dnd3.udongsa.neighborcats.servant.entity;

import lombok.RequiredArgsConstructor;
import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.entity.CatMapper;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ServantMapper {

  private final CatMapper catMapper;
  
  public Servant map(SignUpReqDto dto, Role role, String encodedPassword, Address address, ImgFile profileImg) {
    return Servant.of(
      dto.getName(),
      dto.getEmail(),
      encodedPassword,
      dto.getPhoneNumber(),
      dto.getIsServant(),
      dto.getNickName(),
      role,
      address,
      profileImg
    );
  }

  /**
   * 고양이들과 프로필 이미지 URL 까지 DTO 로 변환합니다.
   * @param servant Entity
   * @return DTO
   */
  public ServantDto map(Servant servant){
    ServantDto dto = new ServantDto();
    ModelMapper mapper = new ModelMapper();
    mapper.map(servant, dto);
    dto.setProfileImgUrl(ImgFileUtils.generateImgFileUrl(servant.getProfileImg()));
    dto.setCats(servant.getCats().stream().map(catMapper::map).collect(Collectors.toList()));
    return dto;
  }

  public AuthorDto mapForAuthor(Servant author) {
    AuthorDto dto = new AuthorDto();
    dto.setId(author.getId());
    dto.setNickName(author.getNickname());
    dto.setAddressName(author.getAddress().getName());
    dto.setProfileImg(ImgFileUtils.generateImgFileUrl(author.getProfileImg()));
    return dto;
  }

}