//package org.dnd3.udongsa.neighborcats.imgfile;
//
//import org.dnd3.udongsa.neighborcats.imgfile.repository.ImgFileRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import javax.persistence.EntityManager;
//
//import static org.assertj.core.api.Assertions.*;
//
//@DataJpaTest
//public class ImgFileRepoTest {
//
//  @Autowired
//  private EntityManager entityManager;
//
//  @Autowired
//  private ImgFileRepository imgFileRepository;
//
//  @Test
//  public void save_test(){
//    ImgFile imgFile1 = ImgFile.of("filepath", "filename", "jpg");
//    imgFile1 = imgFileRepository.save(imgFile1);
//    assertThat(imgFile1.getId()).isNotEqualTo(0L);
//  }
//}
