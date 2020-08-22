package org.dnd3.udongsa.neighborcats.imgfile;

public class ImgFileUtils {

  public static String generateImgFileUrl(Long imgFileId){
    return "/api/imgfiles/"+imgFileId;
  }
  
}