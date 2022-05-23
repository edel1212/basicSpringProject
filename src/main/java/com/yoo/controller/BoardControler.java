package com.yoo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yoo.domain.BoardVO;
import com.yoo.domain.Criteria;
import com.yoo.domain.PageDTO;
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
		log.info("list Page");
		return "/board/list";
	}
	
	@PostMapping("/getList")
	@ResponseBody
	public Map<String, Object> getList(Criteria cri){
		log.info("getList");
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("pageMaker", new PageDTO(cri, boardService.getTotalCount()));
		result.put("list", boardService.getList(cri));
		
		return result;
	}
	
	@PostMapping("/getTotalCount")
	@ResponseBody
	public Long getTotalCount(){
		log.info("getTotalCount");
		return boardService.getTotalCount();
	}
	
	@GetMapping("/register")
	public String register() {
		log.info("register..");
		return "/board/register";
	}
	
	@PostMapping("/register")
	@ResponseBody
	public Map<String, Integer> register(@RequestBody BoardVO vo) {
		log.info("register");
		log.info(vo);
		Map<String, Integer> result = new HashMap<String, Integer>();
		result.put("result", boardService.register(vo));
		return result;
	}
	
	@GetMapping("/get")
	public String get() {
		log.info("get Page");
		return "/board/get";
	}
	
	@ResponseBody
	@PostMapping("/get")
	public BoardVO get(@RequestBody Long bno) {
		BoardVO result = boardService.get(bno);
		return result;
	}
	
	@ResponseBody
	@PostMapping("/modify")
	public int modify(@RequestBody BoardVO vo) {
		return boardService.update(vo);
	}
	
	@ResponseBody
	@PostMapping("/delete")
	public int delete(@RequestBody Long bno) {
		return boardService.delete(bno);
	}
}
