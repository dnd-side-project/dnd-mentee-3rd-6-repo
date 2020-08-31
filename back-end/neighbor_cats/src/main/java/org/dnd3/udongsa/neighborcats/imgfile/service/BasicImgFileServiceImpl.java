package org.dnd3.udongsa.neighborcats.imgfile.service;

import org.dnd3.udongsa.neighborcats.imgfile.BasicImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.EBasicImgType;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileUrlDto;
import org.dnd3.udongsa.neighborcats.imgfile.repository.BasicImgFileRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BasicImgFileServiceImpl implements BasicImgFileService {

  private final ImgFileService imgFileService;
  private final BasicImgFileRepo repo;

  @Override
  @Transactional
  public ImgFileUrlDto uploadServant(MultipartFile multipartFile) {

    BasicImgFile basicImgFile = null;
    if(repo.existsByType(EBasicImgType.SERVANT)){
      basicImgFile = repo.findByType(EBasicImgType.SERVANT).get();
      imgFileService.updateFile(basicImgFile.getImgFile(), multipartFile);
    }else{
      ImgFile imgFile = imgFileService.save(multipartFile);
      basicImgFile = BasicImgFile.of(EBasicImgType.SERVANT, imgFile);
      repo.save(basicImgFile);
    }
    String url = ImgFileUtils.generateImgFileUrl(basicImgFile.getImgFile().getId());
    return new ImgFileUrlDto(url);
  }
  
  
}