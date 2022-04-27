package com.yoo.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yoo.domain.BoardVO;
import com.yoo.service.BoardService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/board/*")
@AllArgsConstructor
public class BoardControler {

	private BoardService boardService;
	
	@GetMapping("/list")
	public String list() {
		log.info("list....");
		return "/board/list";
	}
	
	@PostMapping("/getList")
	@ResponseBody
	public List<BoardVO> getList(){
		log.info("getList");
		return boardService.getList();
	}
	
	@GetMapping("/register")
	public String register() {
		log.info("register..");
		return "/board/register";
	}
	
	@PostMapping("/register")
	public int register(@RequestBody BoardVO vo) {
		log.info("register");
		log.info(vo);
		return boardService.register(vo);
	}
	
}
