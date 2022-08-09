package com.yoo.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import lombok.extern.log4j.Log4j;

@Log4j
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		log.info("login Success!!");
		
		log.info("login user authorites :: " + authentication.getAuthorities());
		//TODO : 필요할 경우 권한에 따른 페이지 분기 해주기 가능 현재는 그냥 메인 board Page로 이동
		response.sendRedirect("/board/list");
		
	}

}
