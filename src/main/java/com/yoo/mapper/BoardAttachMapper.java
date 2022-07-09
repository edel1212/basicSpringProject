package com.yoo.mapper;

import java.util.List;

import com.yoo.domain.BoardAttachVO;

public interface BoardAttachMapper {

	public void insert(BoardAttachVO vo);
	
	public void delete(String uuid);
	
	public void deleteAll(Long bno);
	
	public List<BoardAttachVO> getAttList(Long bno);
	
}
