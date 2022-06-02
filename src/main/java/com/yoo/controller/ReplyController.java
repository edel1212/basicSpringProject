package com.yoo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yoo.domain.ReplyVO;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@RestController
@Log4j
@AllArgsConstructor
@RequestMapping("/reply/*")
public class ReplyController {

	@PostMapping("/getReply")
	public Map<String, Object> getReply(@RequestBody ReplyVO vo){
		log.info("getReply...");
		Map<String, Object> result = new HashMap<String, Object>();
		return result;
	}
	
}
