package org.dnd3.udongsa.neighborcats.imgfile.service;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;

public interface ImgFileService {

	ImgFile upload(byte[] bytes);

	ImgFileDto findById(Long id);

	boolean delete(ImgFile imgFile);
  
}