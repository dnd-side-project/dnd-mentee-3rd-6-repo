package org.dnd3.udongsa.neighborcats.servant.entity;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;

public class ServantTestUtils {

  public static Servant generateDefault(){
    Address address = Address.of("부산광역시", "해운대구", "우동", "");
    Role role = Role.of(ERole.ROLE_USER);
    ImgFile profileImg = ImgFile.of("filePath", "fileName", "ext");
    return Servant.of("홍길동", "test@mail.com", "1234", "01012345678", true, "집사닉네임", role, address, profileImg);
  }
  
}