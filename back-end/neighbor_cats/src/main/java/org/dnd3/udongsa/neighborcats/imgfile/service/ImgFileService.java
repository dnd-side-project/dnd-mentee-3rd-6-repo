package org.dnd3.udongsa.neighborcats.imgfile.service;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.servant.dto.ProfileUploadDto;

public interface ImgFileService {

	ImgFile upload(ProfileUploadDto uploadDto);

	ImgFileDto findById(Long id);
  
}