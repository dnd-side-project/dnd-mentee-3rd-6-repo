package org.dnd3.udongsa.neighborcats.servant.service;

import org.dnd3.udongsa.neighborcats.cat.Cat;
import org.dnd3.udongsa.neighborcats.cat.repository.CatRepository;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImg;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImgRepository;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.dnd3.udongsa.neighborcats.servant.dto.ProfileImgDto;
import org.dnd3.udongsa.neighborcats.servant.dto.ProfileUploadDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServantServiceDefault implements ServantService {

	final private ServantRepository repo;
	final private CatRepository catRepo;
	final private ImgFileService imgFileService;
	final private CatProfileImgRepository catProfileImgRepo;

	@Override
	public Boolean isExistEmail(String email) {
		return repo.existsByEmail(email);
	}

	@Override
	@Transactional
	public ProfileImgDto uploadProfileForSignup(ProfileUploadDto uploadDto, String userEmail) {
		Servant servant = repo.findByEmail(userEmail).orElseThrow();
		Cat cat = new Cat();
		cat.adoptServant(servant);
		catRepo.save(cat);
		ImgFile profileImgFile = imgFileService.upload(uploadDto);
		CatProfileImg catProfileImg = CatProfileImg.of(cat, profileImgFile);
		catProfileImgRepo.save(catProfileImg);

		return new ProfileImgDto(servant.getId(), cat.getId(), profileImgFile.getId());
	}
}