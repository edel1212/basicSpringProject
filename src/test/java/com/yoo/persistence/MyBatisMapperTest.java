package com.yoo.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.yoo.domain.BoardAttachVO;
import com.yoo.mapper.BoardAttachMapper;
import com.yoo.mapper.BoardMapper;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class MyBatisMapperTest {

	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private BoardAttachMapper boardAttachMapper;
	
	@Test
	public void boardGetList() {
	//	boardMapper.getList(new Criteria()).forEach((i)->log.info(i));
	}
	
	
	@Test
	public void insertAttachTest() {
		log.info("insert_Test");
		BoardAttachVO vo = new BoardAttachVO();
		vo.setBno(2008L);
		vo.setFileName("테스트FileName");
		vo.setFileType(true);
		vo.setUploadPath("c://");
		vo.setUuid("123aaaaaaasd123");
		boardAttachMapper.insert(vo);
	}
	
	@Test
	public void getList() {
		log.info("select Test");
		boardAttachMapper.getAttList(2008L);//.forEach((i)->log.info(i));
	}
	
}
