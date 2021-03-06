package com.yoo.service;

import java.util.List;

import com.yoo.domain.BoardAttachVO;
import com.yoo.domain.BoardVO;
import com.yoo.domain.Criteria;

public interface BoardService {
	//목록
	public List<BoardVO> getList(Criteria criteria);
	//총 board 개수
	public Long getTotalCount(Criteria criteria);
	//등록
	public int register(BoardVO vo);
	//선택된 내용
	public BoardVO get(Long bno);
	//수정
	public int update(BoardVO vo);
	//삭제
	public int delete(Long bno);
	
	//이전 파일 목록 가져오기
	List<BoardAttachVO> getOldFiles();
}
