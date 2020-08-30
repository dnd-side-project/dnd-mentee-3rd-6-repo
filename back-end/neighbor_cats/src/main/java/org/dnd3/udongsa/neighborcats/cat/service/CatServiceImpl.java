package org.dnd3.udongsa.neighborcats.cat.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.cat.entity.CatMapper;
import org.dnd3.udongsa.neighborcats.cat.repository.CatRepository;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.catkind.CatKindRepository;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CatServiceImpl implements CatService {

  private final ImgFileService imgFileService;
  private final CatRepository catRepo;
  private final CatKindRepository catKindRepo;

  @Override
  public String uploadCatProfileImg(Cat cat, MultipartFile catProfileImg) {
    if (Objects.isNull(catProfileImg))
      return "";
    if (Objects.nonNull(cat.getProfileImg())) {
      ImgFile imgFile = cat.detachProfileImg();
      imgFileService.delete(imgFile);
    }
    ImgFile imgFile = imgFileService.save(catProfileImg);
    cat.attachProfileImg(imgFile);
    return ImgFileUtils.generateImgFileUrl(imgFile.getId());
  }

  @Override
  public Cat save(Long catKindId, SignUpReqDto reqDto, Servant servant) {
    CatKind kind = findKindByKindId(reqDto.getCatKindId());
    Cat cat = CatMapper.map(reqDto, kind, servant);
    cat = catRepo.save(cat);
    uploadCatProfileImg(cat, reqDto.getCatProfileImg());
    return cat;
  }

  private CatKind findKindByKindId(Long id) {
    return catKindRepo.findById(id)
        .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "품종이 존재하지 않습니다.", "kindId:{}", id));
  }

  @Override
  public List<CatDto> findByServant(Servant servant) {
    List<Cat> cats = catRepo.findByServant(servant);
    return cats.stream().map((cat)->{
      String profileImgUrl = ImgFileUtils.generateImgFileUrl(cat.getProfileImg());
      return CatMapper.map(cat, profileImgUrl);
    }).collect(Collectors.toList());
  }
  
}