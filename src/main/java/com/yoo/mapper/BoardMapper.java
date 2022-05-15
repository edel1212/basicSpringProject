package com.yoo.mapper;

import java.util.List;


import com.yoo.domain.BoardVO;

public interface BoardMapper {
	public List<BoardVO> getList();
	public int register(BoardVO vo);
	public BoardVO get(Long bno);
	public int update(BoardVO vo);
	public int delete(Long bno);
}
