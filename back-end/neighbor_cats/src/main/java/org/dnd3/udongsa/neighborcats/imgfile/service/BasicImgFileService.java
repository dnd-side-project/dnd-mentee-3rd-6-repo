package org.dnd3.udongsa.neighborcats.imgfile.service;

import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileUrlDto;
import org.springframework.web.multipart.MultipartFile;

public interface BasicImgFileService {

	ImgFileUrlDto uploadServant(MultipartFile baseImgFile);
  
}