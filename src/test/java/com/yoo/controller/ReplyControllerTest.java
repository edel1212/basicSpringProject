package com.yoo.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.google.gson.Gson;
import com.yoo.domain.ReplyVO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@Log4j
@WebAppConfiguration
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"
	   ,"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml" 
})
public class ReplyControllerTest {
	
	@Autowired
	private WebApplicationContext ctx;
	
	private MockMvc mockMvc;
	
	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
	}
	
	@Test
	public void testList() throws Exception{
		ReplyVO vo = new ReplyVO();
		vo.setBno(6L);
		String jsonStr = new Gson().toJson(vo);
		log.info("josn!! :: "+jsonStr);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/reply/getReply")
		.contentType(MediaType.APPLICATION_JSON) .content(jsonStr));
		 
	}
	
	
}
