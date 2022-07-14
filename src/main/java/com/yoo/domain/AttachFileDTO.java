package com.yoo.domain;

import lombok.Data;

/**
 *  @Description : 파일 업로드 다운로드
 * */ 
@Data
public class AttachFileDTO {

	private String fileName;
	private String uploadPath;
	private String uuid;
	private boolean fileType;
	
	/**삭제 처리 시 확인용*/
	private String type;
	
}
