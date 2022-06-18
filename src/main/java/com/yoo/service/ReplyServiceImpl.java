package com.yoo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yoo.domain.ReplyVO;
import com.yoo.mapper.BoardMapper;
import com.yoo.mapper.ReplyMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
@Transactional
public class ReplyServiceImpl implements ReplyService {

	@Autowired
	private ReplyMapper replyMapper;
	@Autowired
	private BoardMapper boardMapper;
	
	@Override
	public List<ReplyVO> getReply(ReplyVO vo) {
		log.info("getReply Service!");
		return replyMapper.getReply(vo);
	}

	@Override
	public int registerReply(ReplyVO vo) {
		log.info("registerRelpy ... Service");
		boardMapper.updateReplyCnt(vo.getBno(), 1);
		return replyMapper.registerReply(vo);
	}

	@Override
	public int modifyReply(ReplyVO vo) {
		log.info("modifyRelpy ... Service");
		return replyMapper.modifyReply(vo);
	}

	@Override
	public int deleteReply(ReplyVO vo) {
		log.info("deleteRelpy ... Service");
		boardMapper.updateReplyCnt(vo.getBno(), -1);
		return replyMapper.deleteReply(vo);
	}

}
