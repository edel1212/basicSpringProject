package com.yoo.mapper;

import java.util.List;

import com.yoo.domain.BoardAttachVO;

public interface BoardAttachMapper {

	public void insert(BoardAttachVO vo);
	
	public void delete(String uuid);
	
	public void deleteAll(Long bno);
	
	public List<BoardAttachVO> getAttList(Long bno);
	
	//이전 파일 목록 가져오기
	public List<BoardAttachVO> getOldFiles();
}
