package org.dnd3.udongsa.neighborcats.servant.service;

import org.dnd3.udongsa.neighborcats.servant.dto.ProfileImgDto;
import org.dnd3.udongsa.neighborcats.servant.dto.ProfileUploadDto;

public interface ServantService {

  Boolean isExistEmail(String email);

  ProfileImgDto uploadProfileForSignup(ProfileUploadDto uploadDto, String userEmail);
    
}