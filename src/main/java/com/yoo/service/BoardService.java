package com.yoo.service;

import java.util.List;

import com.yoo.domain.BoardVO;

public interface BoardService {
	//목록
	public List<BoardVO> getList();
	//등록
	public int register(BoardVO vo);
	//선택된 내용
	public BoardVO get(Long bno);
	//수정
	public int update(Long bno);
	//삭제
	public int delete(Long bno);
}
