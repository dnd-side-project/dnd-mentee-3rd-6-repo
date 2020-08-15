package org.dnd3.udongsa.neighborcats.security.auth;

import javax.transaction.Transactional;

import org.dnd3.udongsa.neighborcats.role.ERole;
import org.dnd3.udongsa.neighborcats.role.Role;
import org.dnd3.udongsa.neighborcats.role.RoleRepository;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignInReqDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignInResDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpReqDto;
import org.dnd3.udongsa.neighborcats.security.auth.dto.SignUpResDto;
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
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final ServantRepository servantRepository;

	private final RoleRepository roleRepository;

	private final PasswordEncoder encoder;

  private final JwtUtils jwtUtils;
  
  private final UserDetailsServiceImpl userDetailsService;

  @Override
  @Transactional
  public SignUpResDto signUp(SignUpReqDto reqDto) {
    if(servantRepository.existsByEmail(reqDto.getEmail())){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이메일 중복입니다");
    }
    reqDto.setPassword(encoder.encode(reqDto.getPassword()));
    Servant servant = new ServantMapper().map(reqDto);
    Role role = roleRepository.findByName(ERole.ROLE_USER)
                              .orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST, "USER Role이 존재하지 않습니다."));
    servant.addRole(role);                          
    servantRepository.save(servant);
    String jwt = jwtUtils.generateJwtToken(servant.getEmail());
    return new SignUpResDto(jwt);

  }

  @Override
  public SignInResDto signIn(SignInReqDto reqDto) {
    Servant servant = servantRepository.findByEmail(reqDto.getEmail()).orElseThrow(
      ()->new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email이 존재하지 않습니다.")
    );

    if(!encoder.matches(reqDto.getPassword(), servant.getPassword())){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password가 틀렸습니다.");
    }

    UserDetails userDetails = userDetailsService.loadUserByUsername(servant.getEmail());
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
      userDetails, null, userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    String jwt = jwtUtils.generateJwtToken(servant.getEmail());
    return new SignInResDto(jwt);
  }
}