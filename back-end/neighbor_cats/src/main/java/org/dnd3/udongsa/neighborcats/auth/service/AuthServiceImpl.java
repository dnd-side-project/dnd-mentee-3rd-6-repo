package org.dnd3.udongsa.neighborcats.auth.service;

import javax.transaction.Transactional;

import org.dnd3.udongsa.neighborcats.auth.dto.MeInfo;
import org.dnd3.udongsa.neighborcats.auth.dto.ServantDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.auth.dto.TokenDto;
import org.dnd3.udongsa.neighborcats.cat.service.CatService;
import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.security.jwt.JwtUtils;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final JwtUtils jwtUtils;
  private final CatService catService;
  private final SecurityContextService securityContextService;
  private final ServantService servantService;

  @Override
  @Transactional
  public TokenDto signUp(SignUpReqDto reqDto) {
    if (servantService.isExistEmail(reqDto.getEmail())) {
      throw new CustomException(HttpStatus.BAD_REQUEST, "이메일 중복입니다");
    }
    Servant servant = servantService.save(reqDto, ERole.ROLE_USER);

    if(servant.getIsServant()){
      catService.save(reqDto.getCatKindId(), reqDto, servant);
    }

    return new TokenDto(generateToken(servant.getEmail())); 

  }

  private String generateToken(String servantEmail) {
    securityContextService.setAuthentication(servantEmail);
    String jwt = jwtUtils.generateJwtToken(servantEmail);
    return jwt;
  }

  @Override
  public Boolean isExistEmail(String email) {
    return servantService.isExistEmail(email);
  }

  @Override
  public TokenDto signIn(SignInReqDto reqDto) {
    ServantDto servantDto = servantService.findByEmail(reqDto.getEmail());
    
    if(servantService.isMatchPassword(reqDto.getPassword(), servantDto.getId())){
      throw new CustomException(HttpStatus.BAD_REQUEST, "Password가 틀렸습니다.");
    }

    return new TokenDto(generateToken(servantDto.getEmail())); 
  }

  @Override
  public Boolean isExistNickname(String nickname) {
    return servantService.isExistNickname(nickname);
  }

  @Override
  public MeInfo getMe() {
    Servant servant = securityContextService.getLoggedUser();
    ServantDto servantDto = servantService.findByEmail(servant.getEmail());
    return new MeInfo(
      servantDto.getId(), 
      servantDto.getName(), 
      servantDto.getEmail(), 
      servantDto.getNickName(), 
      servantDto.getName(), 
      servantDto.getPhoneNumber(), 
      servantDto.getProfileImgUrl(), 
      servantDto.getIsServant(),
      servantDto.getRoles(),
      servantDto.getCats());
  }

}