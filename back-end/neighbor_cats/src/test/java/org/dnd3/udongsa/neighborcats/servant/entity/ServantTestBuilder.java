package org.dnd3.udongsa.neighborcats.servant.entity;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.cat.entity.CatTestBuilder;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;

public class ServantTestBuilder {

  public static Servant build(String nickname){
    Address address = Address.of("부산광역시", "해운대구", "우동", "");
    Role role = Role.of(ERole.ROLE_USER);
    ImgFile profileImg = ImgFile.of("filePath", "fileName", "ext");
    Servant servant =  Servant.of(
      "홍길동",
      "test@mail.com",
      "1234",
      "01012345678",
      true,
      nickname,
      role, address, profileImg);
    servant.getCats().add(CatTestBuilder.build("연탄1",servant));
    servant.getCats().add(CatTestBuilder.build("연탄2",servant));
    return servant;
  }
  
}