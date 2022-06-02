package com.yoo.mapper;

import java.util.List;

import com.yoo.domain.ReplyVO;

public interface ReplyMapper {
	public List<ReplyVO> getReply(ReplyVO vo);
	public int registerReply(ReplyVO vo);
	public int modifyReply(ReplyVO vo);
	public int deleteReply(ReplyVO vo);
}
