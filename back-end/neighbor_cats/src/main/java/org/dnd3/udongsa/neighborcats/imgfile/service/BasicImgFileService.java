package org.dnd3.udongsa.neighborcats.imgfile.service;

import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileResDto;
import org.springframework.web.multipart.MultipartFile;

public interface BasicImgFileService {

	ImgFileResDto uploadServant(MultipartFile baseImgFile);
  
}