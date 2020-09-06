package org.dnd3.udongsa.neighborcats.imgfile.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileByteDto;
import org.springframework.web.multipart.MultipartFile;

public interface ImgFileService {

	ImgFile save(MultipartFile multipartFile);

	ImgFileByteDto findById(Long id);

	boolean delete(ImgFile imgFile);

	ImgFile updateFile(ImgFile imgFile, MultipartFile baseImgFile);

	void deleteAll(List<ImgFile> deletedImgFiles);

	List<ImgFile> findAllById(List<Long> removeImgFileIds);

}