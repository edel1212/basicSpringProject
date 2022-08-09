package com.yoo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yoo.domain.BoardVO;
import com.yoo.domain.Criteria;

public interface BoardMapper {
	public List<BoardVO> getList(Criteria criteria);
	public Long getTotalCount(Criteria criteria);
	public int register(BoardVO vo);
	public BoardVO get(Long bno);
	public int update(BoardVO vo);
	public int delete(Long bno);
	public Long bnoSeq();
	//댓글 수 
	public void updateReplyCnt(@Param("bno") Long bno,@Param("amount") int amount);
	
}
