package org.dnd3.udongsa.neighborcats.servant.service;

import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServantServiceDefault implements ServantService {

  final private ServantRepository repo;
  
	@Override
	public Boolean isExistEmail(String email) {
		return repo.existsByEmail(email);
	}

	// @Override
	// @Transactional
	// public ProfileImgDto uploadProfileForSignup(ProfileUploadDto uploadDto, String userEmail) {
	// 	Servant servant = repo.findByEmail(userEmail).orElseThrow();
		
	// 	Cat cat = null;
	// 	List<Cat> cats = catRepo.findByServant(servant);
	// 	if(cats.size() == 0){
	// 		cat = new Cat();
	// 		cat.adoptServant(servant);
	// 	}else{
	// 		cat = cats.get(0);
	// 	}
	// 	catRepo.save(cat);
	// 	CatProfileImg img = catProfileImgRepo.findByCat(cat);
	// 	if(Objects.nonNull(img)){
	// 		imgFileService.delete(img);
	// 	}
	// 	ImgFile profileImgFile = imgFileService.upload(uploadDto);
	// 	CatProfileImg catProfileImg = CatProfileImg.of(cat, profileImgFile);
	// 	catProfileImgRepo.save(catProfileImg);

	// 	return new ProfileImgDto(servant.getId(), cat.getId(), profileImgFile.getId());
	// }

	// @Override
	// @Transactional
	// public SignUpCatResDto signUpCat(SignUpCatDto dto, String userEmail) {
	// 	Servant servant = repo.findByEmail(userEmail).orElseThrow();
	// 	List<Cat> cats = catRepo.findByServant(servant);
	// 	if(cats.size() == 0) {
	// 		throw new CustomException(HttpStatus.BAD_REQUEST, "초기 저장된 Cat을 찾을 수 없음");
	// 	}
	// 	Cat cat = cats.get(0);
	// 	CatKind catKind = catKindRepo.findById(dto.getKindId()).orElseThrow();
	// 	cat = cat.signUp(dto.getName(), dto.getFeatures(), catKind, dto.getGender(), dto.getBirthday());
	// 	CatProfileImg profileImg = catProfileImgRepo.findByCat(cat);
	// 	return new SignUpCatResDto(cat.getId(), cat.getName(), cat.getFeatures(), cat.getKind().getName(), cat.getGender(), cat.getBirthday(), profileImg.getImgFile().getId());
	// }


}