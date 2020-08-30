package org.dnd3.udongsa.neighborcats.auth;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.address.repository.AddressRepository;
import org.dnd3.udongsa.neighborcats.auth.dto.AuthMapper;
import org.dnd3.udongsa.neighborcats.auth.dto.CatProfileUploadResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.LoggedServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpResDto;
import org.dnd3.udongsa.neighborcats.cat.dto.CatDto;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.cat.entity.CatMapper;
import org.dnd3.udongsa.neighborcats.cat.repository.CatRepository;
import org.dnd3.udongsa.neighborcats.catkind.CatKind;
import org.dnd3.udongsa.neighborcats.catkind.CatKindRepository;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImg;
import org.dnd3.udongsa.neighborcats.catprofileimg.CatProfileImgRepository;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.imgfile.service.ImgFileService;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.dnd3.udongsa.neighborcats.role.RoleRepository;
import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final UserDetailsService userDetailsService;
  private final ServantRepository servantRepo;
  private final RoleRepository roleRepository;
  private final CatKindRepository catKindRepo;
  private final CatRepository catRepo;
  private final CatProfileImgRepository catProfileRepo;
  private final ImgFileService imgFileService;
  private final AddressRepository addressRepo;

  @Override
  @Transactional
  public SignUpResDto signUp(SignUpReqDto reqDto) {
    if (servantRepo.existsByEmail(reqDto.getEmail())) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "이메일 중복입니다");
    }
    Role role = findRoleByRoleName(ERole.ROLE_USER);
    String encodedPassword = encoder.encode(reqDto.getPassword());
    Address address = findOrSaveAddresByDepths(reqDto.getAddressDepth1(), reqDto.getAddressDepth2(),
    reqDto.getAddressDepth3(), reqDto.getAddressDepth4());
    
    Servant servant = ServantMapper.map(reqDto, role, encodedPassword, address);
    servant = servantRepo.save(servant);
    String accessToken = generateToken(servant);

    if(!servant.getIsServant()){
      return AuthMapper.map(servant, accessToken);
    }

    CatKind kind = findKindByKindId(reqDto.getCatKindId());
    Cat cat = CatMapper.map(reqDto, kind, servant);
    cat = catRepo.save(cat);
    String catProfileImgUrl = uploadCatProfileImg(cat, reqDto.getCatProfileImg());

    return AuthMapper.map(servant, cat, accessToken, catProfileImgUrl);
  }

  /**
   * 냥이 이미지 파일 업로드
   */
  private String uploadCatProfileImg(Cat cat, MultipartFile catProfileImg) {
    if(Objects.isNull(catProfileImg)) return "";
    if (catProfileRepo.existsByCat(cat)) {
      CatProfileImg catProfile = catProfileRepo.findByCat(cat);
      ImgFile imgFile = catProfile.getImgFile();
      catProfileRepo.delete(catProfile);
      imgFileService.delete(imgFile);
    }
    ImgFile imgFile = imgFileService.upload(getBytes(catProfileImg));
    catProfileRepo.save(CatProfileImg.of(cat, imgFile));
    return ImgFileUtils.generateImgFileUrl(imgFile.getId());
  }

  private byte[] getBytes(MultipartFile file){
    byte[] bytes = new byte[0];
    try {
      bytes = file.getBytes();
    } catch (IOException e) {
      throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "프로필 이미지 파일 로딩에 실패했습니다.");
    }
    return bytes;
  }

  private Address findOrSaveAddresByDepths(String depth1, String depth2, String depth3, String depth4) {
    if(Objects.isNull(depth4)){
      depth4 = "";
    }
    Optional<Address> optAddress = addressRepo.findByDepths(depth1, depth2, depth3, depth4);
    if(optAddress.isPresent()){
      return optAddress.get();
    }
    Address address = Address.of(depth1, depth2, depth3, depth4);
    return addressRepo.save(address);
  }

  private Role findRoleByRoleName(ERole role){
    return roleRepository.findByName(ERole.ROLE_USER)
    .orElseThrow(()->new CustomException(HttpStatus.BAD_REQUEST,
                                        "USER Role이 존재하지 않습니다."));
  }

  private CatKind findKindByKindId(Long id){
    return catKindRepo.findById(id)
    .orElseThrow(()->new CustomException(HttpStatus.BAD_REQUEST, 
                                          "품종이 존재하지 않습니다.", 
                                          "kindId:{}", 
                                          id));
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
  public CatProfileUploadResDto signUpCatProfileImg(byte[] imgBytes) {
    String userEmail = getLoggedUserEmail();
    if (imgBytes.length == 0) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "이미지 파일 사이즈가 0입니다.");
    }
    Servant servant = servantRepo.findByEmail(userEmail).orElseThrow();

    List<Cat> cats = catRepo.findByServant(servant);
    if (cats.size() == 0) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "고양이 회원가입 정보가 없습니다.");
    } else if (cats.size() >= 2) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "고양이가 2마리 이상 가입되어 있습니다. 마이페이지에서 프로필을 추가해보세요.");
    }
    Cat cat = cats.get(0);
    if (catProfileRepo.existsByCat(cat)) {
      CatProfileImg catProfile = catProfileRepo.findByCat(cat);
      ImgFile imgFile = catProfile.getImgFile();
      catProfileRepo.delete(catProfile);
      imgFileService.delete(imgFile);
    }
    ImgFile imgFile = imgFileService.upload(imgBytes);
    CatProfileImg catProfile = CatProfileImg.of(cat, imgFile);
    catProfile = catProfileRepo.save(catProfile);
    CatProfileUploadResDto res = new CatProfileUploadResDto();
    res.setCatProfileImgUrl(ImgFileUtils.generateImgFileUrl(imgFile.getId()));
    return res;
  }

  @Override
  public LoggedServantDto getLoggedServant() {
    String email = getLoggedUserEmail();
    Servant servant = servantRepo.findByEmail(email)
      .orElseThrow(()->new CustomException(HttpStatus.BAD_REQUEST, "해당 유저를 찾을 수 없습니다.", "email: {}", email));
    LoggedServantDto dto = new LoggedServantDto();
    dto.setId(servant.getId());
    dto.setName(servant.getName());
    dto.setEmail(servant.getEmail());
    dto.setNickName(servant.getNickname());
    dto.setAddressName(servant.getAddress().getName());
    dto.setPhoneNumber(servant.getPhoneNumber());
    dto.setRoles(servant.getRoles());
    List<Cat> cats = catRepo.findByServant(servant);
    List<CatDto> catDtos = new ArrayList<>();
    catDtos = cats.stream().map(cat->{
      CatProfileImg profile = catProfileRepo.findByCat(cat);
      if(Objects.isNull(profile)){
        return CatMapper.map(cat);
      }
      Long imgFileId = profile.getImgFile().getId();
      String profileUrl = ImgFileUtils.generateImgFileUrl(imgFileId);
      return CatMapper.map(cat, profileUrl);
    }).collect(Collectors.toList());
    dto.setCats(catDtos);
    return dto;
  }

  private String getLoggedUserEmail(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    if(Objects.isNull(currentPrincipalName)){
      throw new CustomException(HttpStatus.UNAUTHORIZED, "인증토큰이 올바르지 않습니다.");
    }
    return currentPrincipalName;
  }

  @Override
  public Boolean isExistEmail(String email) {
    return servantRepo.existsByEmail(email);
  }

}