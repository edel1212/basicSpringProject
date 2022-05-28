package com.yoo.domain;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PageDTO {
	private Long startPage;
	private Long endPage;
	private boolean prev,next;
	
	private Long total;
	private Criteria cri;
	
	public PageDTO(Criteria cri,Long total) {
		this.cri = cri;
		this.total = total;
		
		
		this.endPage = (long) (Math.ceil(cri.getPageNum() / 10.0)) * 10;
		this.startPage = this.endPage - 9;
		Long realEnd = (long)Math.ceil(total * 1.0) / cri.getAmount() ;
		if(realEnd < this.endPage) {
			this.endPage = realEnd;
		}
		this.prev = this.startPage  > 1 ;
		this.next = this.endPage < realEnd;
	}
	
}
