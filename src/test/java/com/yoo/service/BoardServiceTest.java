package com.yoo.service;

import static org.junit.Assert.assertNotNull;

import java.util.stream.IntStream;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.yoo.domain.BoardVO;
import com.yoo.domain.Criteria;

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
	
	/**
	 * @description : JUnit 테스트는 파라미터가 안들어간다!!
	 * */
	@Test
	public void getListTest() {
		Criteria criteria = new Criteria();
		criteria.setAmount(10L);
		criteria.setPageNum(1L);
		criteria.setKeyword("a");
		criteria.setType("A");
		
		log.info(criteria);
		log.info(boardService.getList(criteria));
	}

	@Test
	public void getTotalCount() {
		log.info("count!");
		//log.info(boardService.getTotalCount());
		
		//Long total = boardService.getTotalCount();
		//Long endPageNum = (long) Math.ceil(( total * 1.0 ) / 10) ;
		
		//log.info("endNum === " + endPageNum);
		
	}
	
	@Test
	public void register() {
		IntStream.range(0, 150).forEach((i)->{
			BoardVO vo = new BoardVO();
			vo.setTitle("Title"+(i+1));
			vo.setContent("Content"+(i+1));
			vo.setWriter("Yoo"+(i+1));
			boardService.register(vo);
		});
	}
	
}
