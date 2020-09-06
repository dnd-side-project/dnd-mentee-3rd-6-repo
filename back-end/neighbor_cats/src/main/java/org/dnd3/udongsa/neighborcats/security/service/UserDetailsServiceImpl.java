package org.dnd3.udongsa.neighborcats.security.service;

import javax.transaction.Transactional;

import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.repository.ServantRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final ServantRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		Servant servant = userRepository.findByEmail(userEmail)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with userEmail: " + userEmail));
		
		return UserDetailsImpl.build(servant);
	}
}