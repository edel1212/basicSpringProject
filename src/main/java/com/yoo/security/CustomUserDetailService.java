package com.yoo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.yoo.domain.MemberVO;
import com.yoo.mapper.MemberMapper;

import lombok.extern.log4j.Log4j;

@Log4j
public class CustomUserDetailService implements UserDetailsService{
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		log.info("Request Login ID " + username);
	
		//받아온 ID를 통해 정보를 가져옴 pw 체크를 하진 않음
		MemberVO vo = memberMapper.getMemberInfo(username);
		
		log.warn("queried by member Mapper :: " + vo);
		
		return vo == null ? null : new CustomUser(vo);
		
	}

	
	
	
}
