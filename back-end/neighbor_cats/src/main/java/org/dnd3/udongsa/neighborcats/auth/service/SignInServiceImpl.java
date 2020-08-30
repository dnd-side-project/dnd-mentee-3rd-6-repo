package org.dnd3.udongsa.neighborcats.auth.service;

import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFileUtils;
import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignInServiceImpl implements SignInService {

  private final ServantRepository servantRepo;
  private final JwtUtils jwtUtils;
  private final PasswordEncoder encoder;
  private final SecurityContextService securityContextService;

  @Override
  public SignInResDto signIn(SignInReqDto reqDto) {
    Servant servant = servantRepo.findByEmail(reqDto.getEmail())
      .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "Email이 존재하지 않습니다."));

    if (!encoder.matches(reqDto.getPassword(), servant.getPassword())) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "Password가 틀렸습니다.");
    }

    String profileImgUrl = ImgFileUtils.generateImgFileUrl(servant.getProfileImg());

    return new SignInResDto(
      generateToken(servant), 
      servant.getId(), 
      servant.getName(), 
      servant.getEmail(), 
      servant.getNickname(), 
      servant.getAddress().getName(), 
      servant.getPhoneNumber(), 
      profileImgUrl, 
      servant.getRoles());
  }

  private String generateToken(Servant servant) {
    securityContextService.setAuthentication(servant.getEmail());
    String jwt = jwtUtils.generateJwtToken(servant.getEmail());
    return jwt;
  }
}