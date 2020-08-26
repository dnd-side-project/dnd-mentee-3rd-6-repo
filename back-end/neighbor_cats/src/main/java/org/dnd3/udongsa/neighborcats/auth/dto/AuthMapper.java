package org.dnd3.udongsa.neighborcats.auth.dto;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class AuthMapper {

  public static SignUpResDto map(Servant servant, Cat cat, String accessToken, String catProfileImgUrl){
    SignUpResDto res = SignUpResDto.builder()
                                    .servantId(servant.getId())
                                    .phoneNumber(servant.getPhoneNumber())
                                    .name(servant.getName())
                                    .email(servant.getEmail())
                                    .password(servant.getPassword())
                                    .isServant(servant.getIsServant())
                                    .nickName(servant.getNickname())
                                    .addressName(servant.getAddress().getName())
                                    .catId(cat.getId())
                                    .catName(cat.getName())
                                    .catFeatures(cat.getFeatures())
                                    .catKindId(cat.getKind().getId())
                                    .catGender(cat.getGender())
                                    .catBirthday(cat.getBirthday())
                                    .catNeutralized(cat.getNeutralized())
                                    .catProfileImgUrl(catProfileImgUrl)
                                    .catWeight(cat.getWeight())
                                    .accessToken(accessToken).build();
    return res;
  }

public static SignUpResDto map(Servant servant, String accessToken) {
  SignUpResDto res = SignUpResDto.builder()
  .servantId(servant.getId())
  .phoneNumber(servant.getPhoneNumber())
  .name(servant.getName())
  .email(servant.getEmail())
  .password(servant.getPassword())
  .isServant(servant.getIsServant())
  .nickName(servant.getNickname())
  .addressName(servant.getAddress().getName())
  .accessToken(accessToken)
  .build();
return res;
}
  
}