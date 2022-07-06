package com.yoo.domain;

import lombok.Data;

/**
 * @Desription : tbl_attach 테이블 VO
 * */
@Data
public class BoardAttachVO {

	private String uuid;
	private String uploadPath;
	private String fileName;
	private boolean fileType;
	
	private Long bno;
	
}
