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
		log.info("servieImp - getList...");
		return boardMapper.getList();
	}

	@Override
	public int register(BoardVO vo) {
		log.info("servieImp - regisger...");
		return boardMapper.register(vo);
	}

	@Override
	public BoardVO get(Long bno) {		
		log.info("servieImp - Get...");
		return boardMapper.get(bno);
	}

	@Override
	public int update(BoardVO vo) {
		log.info("servieImp - update...");
		return boardMapper.update(vo);
	}

	@Override
	public int delete(Long bno) {
		log.info("servieImp - delete...");
		return boardMapper.delete(bno);
	}

}
