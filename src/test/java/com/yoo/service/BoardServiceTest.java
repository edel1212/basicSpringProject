package com.yoo.service;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@Log4j
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class BoardServiceTest {
	
	@Autowired
	private BoardService boardService;
	
	@Test
	public void testExist() {
		log.info(boardService);
		/**
		 * @description : assertNotNull 란?  객체가 Null인지 아닌지 체크하는 JUnit4 함수
		 * */
		assertNotNull(boardService);
	}
	
	@Test
	public void getListTest() {
		log.info(boardService.getList());
	}
	
}
