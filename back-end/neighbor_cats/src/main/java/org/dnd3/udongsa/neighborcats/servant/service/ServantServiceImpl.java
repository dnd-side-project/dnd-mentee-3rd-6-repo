package org.dnd3.udongsa.neighborcats.servant.service;

import lombok.RequiredArgsConstructor;
import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.address.repository.AddressRepository;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.imgfile.BasicImgFile;
import org.dnd3.udongsa.neighborcats.imgfile.EBasicImgType;
import org.dnd3.udongsa.neighborcats.imgfile.repository.BasicImgFileRepo;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.dnd3.udongsa.neighborcats.role.RoleRepository;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServantServiceImpl implements ServantService {

  private final ServantRepository repo;
  private final PasswordEncoder encoder;
  private final RoleRepository roleRepository;
  private final AddressRepository addressRepo;
  private final BasicImgFileRepo defaultImgFileRepo;
  private final SecurityContextService securityService;
  private final ServantMapper servantMapper;

  @Override
  public Boolean isExistEmail(String email) {
    return repo.existsByEmail(email);
  }

  @Override
  public Servant save(SignUpReqDto reqDto, ERole roleUser) {
    Role role = findRoleByRoleName(ERole.ROLE_USER);
    String encodedPassword = encoder.encode(reqDto.getPassword());
    Address address = findOrSaveAddressByDepths(reqDto.getAddressDepth1(), reqDto.getAddressDepth2(),
        reqDto.getAddressDepth3(), reqDto.getAddressDepth4());

    BasicImgFile servantBasicImg = findByType(EBasicImgType.SERVANT);
    Servant servant = servantMapper.map(reqDto, role, encodedPassword, address, servantBasicImg.getImgFile());
    return repo.save(servant);
  }

  private Address findOrSaveAddressByDepths(String depth1, String depth2, String depth3, String depth4) {
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
    return roleRepository.findByName(role)
        .orElseThrow(() ->
          new CustomException(HttpStatus.BAD_REQUEST
            , "USER Role 이 존재하지 않습니다."));
  }

  private BasicImgFile findByType(EBasicImgType type) {
    return defaultImgFileRepo.findByType(type)
        .orElseThrow(() ->
          new CustomException(HttpStatus.INTERNAL_SERVER_ERROR
            , "기본 프로필이미지가 존재하지 않습니다."));
  }

  @Override
  public ServantDto findByEmail(String email) {
    Servant servant = repo.findByEmail(email)
      .orElseThrow(() -> new CustomException(
        HttpStatus.BAD_REQUEST
        , "Email 이 존재하지 않습니다."));
    return servantMapper.map(servant);
  }

  @Override
  public boolean isMatchPassword(String password, Long servantId) {
    return !encoder.matches(password, repo.findById(servantId).orElseThrow().getPassword());
  }

  @Override
  public Servant findServantByEmail(String loggedUserEmail) {
    return repo.findByEmail(loggedUserEmail).orElseThrow();
  }

  @Override
  public Boolean isExistNickname(String nickname) {
    return repo.existsByNickname(nickname);
  }

  @Override
  public ServantDto getMe() {
    Servant servant = securityService.getLoggedUser();
    return servantMapper.map(servant);
  }


}