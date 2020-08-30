package org.dnd3.udongsa.neighborcats.imgfile;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class ImgFileUtilsTest {

  @Test
  public void GivenImgFileIDWhenGenerateThenReturnedUrl(){
    // given
    long imgFileId = 1L;
    // when
    String imgFileUrl = ImgFileUtils.generateImgFileUrl(imgFileId);
    // then
    assertEquals("/api/imgfiles/1", imgFileUrl);
  }

  @Test
  public void GivenIdNullWhenGenerateThenReturnedEmptyString(){
    long imgFileId = 0L;
    String imgFileUrl = ImgFileUtils.generateImgFileUrl(imgFileId);
    assertEquals("", imgFileUrl);
  }

  @Test
  public void GivenImgFileNullWhenGenerateThenReturnedEmptyString(){
    ImgFile imgFile = null;
    String imgFileUrl = ImgFileUtils.generateImgFileUrl(imgFile);
    assertEquals("", imgFileUrl);
  }

  @Test
  public void GivenImgFileNoneIDImgFileWhenGenerateThenReturnedEmptyString(){
    ImgFile imgFile = ImgFile.of("filePath", "fileName", "ext");
    String imgFileUrl = ImgFileUtils.generateImgFileUrl(imgFile);
    assertEquals("", imgFileUrl);
  }
  
}