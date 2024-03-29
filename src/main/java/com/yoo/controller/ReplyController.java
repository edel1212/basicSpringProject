package com.yoo.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yoo.domain.ReplyVO;
import com.yoo.service.ReplyService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@RestController
@Log4j
@AllArgsConstructor
@RequestMapping("/reply/*")
public class ReplyController {

	private ReplyService replyService;
	
	@PostMapping("/getReply")
	public Map<String, Object> getReply(@RequestBody ReplyVO vo){
		log.info("getReply...");
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("result",replyService.getReply(vo));
		return result;
	}
	
	@PostMapping("/registerReply")
	public int registerReply(@RequestBody ReplyVO vo, HttpServletRequest request){
		log.info("registerReply...");
		HttpSession session = request.getSession();
		vo.setReplyer(String.valueOf(session.getAttribute("userId")));
		return replyService.registerReply(vo);
	}
	
	@PostMapping("/modifyReply")
	public int modifyReply(@RequestBody ReplyVO vo, HttpServletRequest request){
		log.info("modifyReply...");
		HttpSession session = request.getSession();
		vo.setReplyer(String.valueOf(session.getAttribute("userId")));
		return replyService.modifyReply(vo);
	}
	
	@PostMapping("/deleteReply")
	public int deleteReply(@RequestBody ReplyVO vo){
		log.info("deleteReply...");
		return replyService.deleteReply(vo);
	}
	
}
