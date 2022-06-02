package com.yoo.service;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.yoo.domain.ReplyVO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@Log4j
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class ReplyServiceTest {
	
	@Autowired
	private ReplyService replyService;
	
	@Test
	public void TestExist() {
		log.info(replyService);
		assertNotNull(replyService);
	}
	
	@Test
	public void getList() {
		log.info("getReplyList...");
		ReplyVO vo = new ReplyVO();
		vo.setBno(6L);
		log.info(replyService.getReply(vo));
	}
	
	@Test
	public void register() {
		log.info("register..");
		ReplyVO vo = new ReplyVO();
		vo.setBno(12L);
		vo.setReply("yoo reply");
		vo.setReplyer("yoo!!!");
		log.info(replyService.registerReply(vo));
	}
	
}
