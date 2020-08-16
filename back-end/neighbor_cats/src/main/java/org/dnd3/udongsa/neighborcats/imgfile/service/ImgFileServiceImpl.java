package org.dnd3.udongsa.neighborcats.imgfile.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.IIOByteBuffer;
import javax.imageio.stream.ImageOutputStream;

import org.apache.commons.io.FileUtils;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImg;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.imgfile.repository.ImgFileRepository;
import org.dnd3.udongsa.neighborcats.servant.dto.ProfileUploadDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgFileServiceImpl implements ImgFileService {

  private final ImgFileRepository repo;

  @Value("${app.imgfile.dir}")
  private String imgFileDir;

  private final String IMG_FILE_EXT = "JPG";

  @Override
  @Transactional
  public ImgFile upload(ProfileUploadDto uploadDto) {
    MultipartFile multipartFile = uploadDto.getImgFile();
    String fileName = generateRandomFileName();
    String filePath = saveImgFile(multipartFile, fileName);
    ImgFile imgFile = ImgFile.of(filePath, fileName, IMG_FILE_EXT);
    repo.save(imgFile);
    return imgFile;
  }

  private String saveImgFile(MultipartFile multipartFile, String fileName) {
    Path filePath = Path.of(imgFileDir, fileName).toAbsolutePath();
    File file = filePath.toFile();
    try {
      FileUtils.writeByteArrayToFile(file, multipartFile.getBytes());
    } catch (IOException e) {
      e.printStackTrace();
    }
    return filePath.toString();
  }

  private String generateRandomFileName() {
    long timestamp = System.currentTimeMillis();
    int randomNumber = (int) (Math.random() * 1000000);
    String fileName = "" + timestamp + "_" + randomNumber;
    return fileName;
  }

  @Override
  public ImgFileDto findById(Long id) {
    ImgFile imgFile = repo.findById(id).orElseThrow();
    byte[] bytes = new byte[0];
    try {
      bytes = FileUtils.readFileToByteArray(new File(imgFile.getFilePath()));
    } catch (IOException e) {
      e.printStackTrace();
    }
    ImgFileDto dto = new ImgFileDto(imgFile.getFileName(), bytes);
    return dto;
  }

  @Override
  public void delete(CatProfileImg img) {
    FileUtils.deleteQuietly(new File(img.getImgFile().getFilePath()));
  }


  
}