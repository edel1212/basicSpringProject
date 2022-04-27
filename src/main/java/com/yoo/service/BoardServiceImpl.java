package com.yoo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yoo.domain.BoardVO;
import com.yoo.mapper.BoardMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {
	
	private BoardMapper boardMapper;
	
	@Override
	public List<BoardVO> getList() {
		// TODO Auto-generated method stub
		log.info("servieImp - getList...");
		return boardMapper.getList();
	}

	@Override
	public int register(BoardVO vo) {
		// TODO Auto-generated method stub
		log.info("servieImp - regisger...");
		return boardMapper.register(vo);
	}

}
