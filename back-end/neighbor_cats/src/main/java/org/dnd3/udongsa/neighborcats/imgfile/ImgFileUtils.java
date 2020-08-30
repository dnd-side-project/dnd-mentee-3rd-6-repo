package org.dnd3.udongsa.neighborcats.imgfile;

import java.util.Objects;

public class ImgFileUtils {

  /**
   * 이미지 URL 생성
   * @param imgFileId ImgFile ID
   * @return 이미지 URL
   */
  public static String generateImgFileUrl(long imgFileId){
    if(imgFileId == 0L) return "";
    return "/api/imgfiles/"+imgFileId;
  }

  /**
   * 이미지 URL 생성. imgFile이 Null이면 "" 반환
   * @param imgFile ImgFile Entity
   * @return 이미지 URL. 만약, imgFile이 Null이면 "" 반환
   */
  public static String generateImgFileUrl(ImgFile imgFile){
    if(Objects.isNull(imgFile) || Objects.isNull(imgFile.getId())) 
      return "";
    return "/api/imgfiles/"+imgFile.getId();
  }


}