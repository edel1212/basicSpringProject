package com.yoo.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yoo.domain.BoardAttachVO;
import com.yoo.domain.BoardVO;
import com.yoo.domain.Criteria;
import com.yoo.mapper.BoardAttachMapper;
import com.yoo.mapper.BoardMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {
	
	private BoardMapper boardMapper;
	
	private BoardAttachMapper boardAttachMapper;
	
	@Override
	public List<BoardVO> getList(Criteria criteria) {
		log.info("servieImp - getList...");
		criteria.setPageNum((criteria.getPageNum()-1L) * 10);
		return boardMapper.getList(criteria);
	}

	@Override
	public Long getTotalCount(Criteria criteria) {
		log.info("totalCount");
		return boardMapper.getTotalCount(criteria);
	}
	
	@Override
	public int register(BoardVO vo) {
		log.info("servieImp - regisger...");
		
		vo.setBno(boardMapper.bnoSeq());
		
		int result = boardMapper.register(vo);
		
		//업로드 파일이 존재할경우
		if(vo.getAttachList() != null && vo.getAttachList().size() > 0) {
			for(BoardAttachVO attach : vo.getAttachList()) {
				attach.setBno(vo.getBno());
				boardAttachMapper.insert(attach);
			}
		}
		return result;
	}

	@Override
	public BoardVO get(Long bno) {		
		log.info("servieImp - Get...");
		BoardVO result = boardMapper.get(bno);
		result.setAttachList(boardAttachMapper.getAttList(bno));
		return result;
	}

	@Override
	public int update(BoardVO vo) {
		log.info("servieImp - update...");
		
		long bno = vo.getBno();
	
		//전체 삭제
		boardAttachMapper.deleteAll(vo.getBno());
		
		//추가
		vo.getAttachList().forEach(attach->{
			attach.setBno(bno);
			boardAttachMapper.insert(attach);
		});
		
		return boardMapper.update(vo);
	}

	@Override
	public int delete(Long bno) {
		log.info("servieImp - delete...");
		
		List<BoardAttachVO> attachList = boardAttachMapper.getAttList(bno);
		boardAttachMapper.deleteAll(bno);
		deleteFiles(attachList);
		
		return boardMapper.delete(bno);
	}

	
	/**
	 * @Description : 게시물 삭제시 하위 첨부파일 삭제 로직
	 * **/
	private void deleteFiles(List<BoardAttachVO> attachList) {
		
		if(attachList == null || attachList.size() == 0) return;
		
		log.info("delte attach Files!");
		log.info("attachList ::: " + attachList);
			
		attachList.forEach((attach)->{
			log.info(attach);
			try {
				
				Path file = Paths.get("C:\\upload\\"
										+	attach.getUploadPath()
										+ "\\" 
										+ attach.getUuid()
										+ "_"
										+ attach.getFileName());
				//Delete
				Files.deleteIfExists(file);
				
				//Image Check
				if(Files.probeContentType(file).startsWith("image")) {
					Path thumbNail = Paths.get("C:\\upload\\"
												+	attach.getUploadPath()
												+ "\\s_" 
												+ attach.getUuid()
												+ "_"
												+ attach.getFileName());
					Files.delete(thumbNail);
				}//if
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		
	}

	@Override
	public List<BoardAttachVO> getOldFiles() {
		log.info("get getOldFileList......");
		return boardAttachMapper.getOldFiles();
	}
	
}
