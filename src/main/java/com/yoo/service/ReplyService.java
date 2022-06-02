package com.yoo.service;

import java.util.List;

import com.yoo.domain.ReplyVO;

public interface ReplyService {
	public List<ReplyVO> getReply(ReplyVO vo);
	public int registerReply(ReplyVO vo);
	public int modifyReply(ReplyVO vo);
	public int deleteReply(ReplyVO vo);
}
