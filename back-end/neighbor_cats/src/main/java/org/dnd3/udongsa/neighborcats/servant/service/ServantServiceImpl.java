package org.dnd3.udongsa.neighborcats.servant.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.address.repository.AddressRepository;
import org.dnd3.udongsa.neighborcats.auth.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.service.CatService;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.imgfile.BasicImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.EBasicImgType;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.imgfile.repository.BasicImgFileRepo;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.dnd3.udongsa.neighborcats.role.RoleRepository;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServantServiceImpl implements ServantService {

  private final ServantRepository repo;
  private final PasswordEncoder encoder;
  private final RoleRepository roleRepository;
  private final AddressRepository addressRepo;
  private final BasicImgFileRepo defaultImgFileRepo;
  private final CatService catService;

  @Override
  public Boolean isExistEmail(String email) {
    return repo.existsByEmail(email);
  }

  @Override
  public Servant save(SignUpReqDto reqDto, ERole roleUser) {
    Role role = findRoleByRoleName(ERole.ROLE_USER);
    String encodedPassword = encoder.encode(reqDto.getPassword());
    Address address = findOrSaveAddresByDepths(reqDto.getAddressDepth1(), reqDto.getAddressDepth2(),
        reqDto.getAddressDepth3(), reqDto.getAddressDepth4());

    BasicImgFile servantBasicImg = findByType(EBasicImgType.SERVANT);
    Servant servant = ServantMapper.map(reqDto, role, encodedPassword, address, servantBasicImg.getImgFile());
    return repo.save(servant);
  }

  private Address findOrSaveAddresByDepths(String depth1, String depth2, String depth3, String depth4) {
    if (Objects.isNull(depth4)) {
      depth4 = "";
    }
    Optional<Address> optAddress = addressRepo.findByDepths(depth1, depth2, depth3, depth4);
    if (optAddress.isPresent()) {
      return optAddress.get();
    }
    Address address = Address.of(depth1, depth2, depth3, depth4);
    return addressRepo.save(address);
  }

  private Role findRoleByRoleName(ERole role) {
    return roleRepository.findByName(ERole.ROLE_USER)
        .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "USER Role이 존재하지 않습니다."));
  }

  private BasicImgFile findByType(EBasicImgType type) {
    return defaultImgFileRepo.findByType(type)
        .orElseThrow(() -> new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "기본 프로필이미지가 존재하지 않습니다."));
  }

  @Override
  public ServantDto findByEmail(String email) {
    Servant servant = repo.findByEmail(email)
      .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "Email이 존재하지 않습니다."));
    String profileImgUrl = ImgFileUtils.generateImgFileUrl(servant.getProfileImg());
    List<CatDto> catDtos = catService.findByServant(servant);
    return ServantMapper.map(servant, profileImgUrl, catDtos);
  }

  @Override
  public boolean isMatchPassword(String password, Long id) {
    return !encoder.matches(password, repo.findById(id).get().getPassword());
  }

  @Override
  public Servant findServantByEmail(String loggedUserEmail) {
    return repo.findByEmail(loggedUserEmail).orElseThrow();
  }

  @Override
  public Boolean isExistNickname(String nickname) {
    return repo.existsByNickname(nickname);
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