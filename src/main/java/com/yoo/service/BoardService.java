package com.yoo.service;

import java.util.List;

import com.yoo.domain.BoardVO;

public interface BoardService {
	//목록
	public List<BoardVO> getList();
	//등록
	public int register(BoardVO vo);
}
