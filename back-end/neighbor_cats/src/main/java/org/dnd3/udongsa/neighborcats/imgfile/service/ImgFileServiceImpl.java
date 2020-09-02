package org.dnd3.udongsa.neighborcats.imgfile.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedImg;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileByteDto;
import org.dnd3.udongsa.neighborcats.imgfile.repository.ImgFileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
  public ImgFile save(MultipartFile multipartFile) {
    String fileName = generateRandomFileName();
    String filePath = saveImgFile(getBytes(multipartFile), fileName);
    ImgFile imgFile = ImgFile.of(filePath, fileName, IMG_FILE_EXT);
    repo.save(imgFile);
    return imgFile;
  }

  private byte[] getBytes(MultipartFile file) {
    byte[] bytes = new byte[0];
    try {
      bytes = file.getBytes();
    } catch (IOException e) {
      throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "프로필 이미지 파일 로딩에 실패했습니다.");
    }
    return bytes;
  }

  private String saveImgFile(byte[] bytes, String fileName) {
    Path filePath = Path.of(imgFileDir, fileName).toAbsolutePath();
    File file = filePath.toFile();
    try {
      FileUtils.writeByteArrayToFile(file, bytes);
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
  public ImgFileByteDto findById(Long id) {
    ImgFile imgFile = repo.findById(id).orElseThrow();
    byte[] bytes = new byte[0];
    try {
      bytes = FileUtils.readFileToByteArray(new File(imgFile.getFilePath()));
    } catch (IOException e) {
      e.printStackTrace();
    }
    ImgFileByteDto dto = new ImgFileByteDto(imgFile.getFileName(), bytes);
    return dto;
  }

  @Override
  @Transactional
  public boolean delete(ImgFile imgFile) {
    FileUtils.deleteQuietly(new File(imgFile.getFilePath()));
    repo.delete(imgFile);
    return true;
  }

  @Override
  public ImgFile updateFile(ImgFile imgFile, MultipartFile multipartFile) {
    FileUtils.deleteQuietly(new File(imgFile.getFilePath()));

    String newFileName = generateRandomFileName();
    String newFilepath = saveImgFile(getBytes(multipartFile), newFileName);
    imgFile.updateFile(newFilepath, newFileName, IMG_FILE_EXT);
    return imgFile;
  }



  
}