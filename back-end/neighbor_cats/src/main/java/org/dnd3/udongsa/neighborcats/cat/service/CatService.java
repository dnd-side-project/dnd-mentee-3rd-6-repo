package org.dnd3.udongsa.neighborcats.cat.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.web.multipart.MultipartFile;

public interface CatService {

  /**
   * 냥이 프로필 이미지 업로드
   * @param cat 고양이 Entity
   * @param catProfileImg 고양이 프로필이미지 MultipartFile
   * @return 이미지파일 URL
   */
	String uploadCatProfileImg(Cat cat, MultipartFile catProfileImg);

  Cat save(Long catKindId, SignUpReqDto reqDto, Servant servant);

  List<CatDto> findByServant(Servant servant);

}