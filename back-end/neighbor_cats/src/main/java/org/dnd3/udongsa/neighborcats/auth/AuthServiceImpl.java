package org.dnd3.udongsa.neighborcats.auth;

import java.util.List;

import javax.transaction.Transactional;

import org.dnd3.udongsa.neighborcats.auth.dto.CatProfileUploadResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.cat.entity.CatMapper;
import org.dnd3.udongsa.neighborcats.cat.repository.CatRepository;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.catkind.CatKindRepository;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImg;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImgRepository;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.dnd3.udongsa.neighborcats.role.RoleRepository;
import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
import org.dnd3.udongsa.neighborcats.security.service.UserDetailsServiceImpl;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final ServantRepository servantRepo;

  private final RoleRepository roleRepository;

  private final PasswordEncoder encoder;

  private final JwtUtils jwtUtils;

  private final UserDetailsServiceImpl userDetailsService;

  private final CatKindRepository catKindRepo;

  private final CatRepository catRepo;

  private final ImgFileService imgFileService;

  private final CatProfileImgRepository catProfileRepo;

  @Override
  @Transactional
  public SignUpResDto signUp(SignUpReqDto reqDto) {
    if (servantRepo.existsByEmail(reqDto.getEmail())) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "이메일 중복입니다");
    }
    Role role = roleRepository.findByName(ERole.ROLE_USER)
        .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "USER Role이 존재하지 않습니다."));
    CatKind kind = catKindRepo.findById(reqDto.getCatKindId()).orElseThrow(
        () -> new CustomException(HttpStatus.BAD_REQUEST, "품종이 존재하지 않습니다.", "kindId:{}", reqDto.getCatKindId()));

    reqDto.setPassword(encoder.encode(reqDto.getPassword()));
    Servant servant = ServantMapper.map(reqDto, role);
    servant = servantRepo.save(servant);
    Cat cat = CatMapper.map(reqDto, kind, servant);
    cat = catRepo.save(cat);

    // Response Dto 생성 맵핑
    SignUpResDto res = SignUpResDto.builder().servantId(servant.getId()).phoneNumber(servant.getPhoneNumber())
        .name(servant.getName()).email(servant.getEmail()).password(servant.getPassword())
        .isServant(servant.getIsServant()).nickName(servant.getNickname()).address(servant.getAddress())
        .catId(cat.getId()).catName(cat.getName()).catFeatures(cat.getFeatures()).catKindId(cat.getKind().getId())
        .catGender(cat.getGender()).catBirthday(cat.getBirthday()).catNeutralized(cat.getNeutralized())
        .accessToken(generateToken(servant)).build();

    return res;

  }

  @Override
  public SignInResDto signIn(SignInReqDto reqDto) {
    Servant servant = servantRepo.findByEmail(reqDto.getEmail())
        .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "Email이 존재하지 않습니다."));

    if (!encoder.matches(reqDto.getPassword(), servant.getPassword())) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "Password가 틀렸습니다.");
    }

    return new SignInResDto(generateToken(servant));
  }

  private String generateToken(Servant servant) {
    UserDetails userDetails = userDetailsService.loadUserByUsername(servant.getEmail());
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null,
        userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    String jwt = jwtUtils.generateJwtToken(servant.getEmail());
    return jwt;
  }

  @Override
  @Transactional
  public CatProfileUploadResDto signUpCatProfileImg(byte[] imgBytes, String userEmail) {
    // imgbytes 확인
    if(imgBytes.length == 0){
      throw new CustomException(HttpStatus.BAD_REQUEST, "이미지 파일 사이즈가 0입니다.");
    }
    // 유저 정보 get
    Servant servant = servantRepo.findByEmail(userEmail).orElseThrow();

    // 유저의 cat 겟
    List<Cat> cats = catRepo.findByServant(servant);
    if(cats.size() == 0){
      throw new CustomException(HttpStatus.BAD_REQUEST, "고양이 회원가입 정보가 없습니다.");
    }else if(cats.size() >= 2){
      throw new CustomException(HttpStatus.BAD_REQUEST, "고양이가 2마리 이상 가입되어 있습니다. 마이페이지에서 프로필을 추가해보세요.");
    }
    Cat cat = cats.get(0);
    if(catProfileRepo.existsByCat(cat)){
      // 이 cat에 등록된 catImgFile 조회하여 있다면, imgFile와 catImgFile 삭제
      CatProfileImg catProfile = catProfileRepo.findByCat(cat);
      ImgFile imgFile = catProfile.getImgFile();
      catProfileRepo.delete(catProfile);
      imgFileService.delete(imgFile);
    }
    // 이미지파일 저장
    ImgFile imgFile = imgFileService.upload(imgBytes);
    // cat img file 엔티티 생성 후 저장
    CatProfileImg catProfile = CatProfileImg.of(cat, imgFile);
    catProfile = catProfileRepo.save(catProfile);
    // url 생성
    CatProfileUploadResDto res = new CatProfileUploadResDto();
    res.setCatProfileImgUrl("/api/imgfiles/"+imgFile.getId());
    return res;
  }

}