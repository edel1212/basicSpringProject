package com.yoo.domain;

import lombok.Data;

@Data
public class Criteria {
	private Long pageNum;
	private Long amount;
	
	private String keyword;
	private String type;
	
	public Criteria() {
		this(1L,10L);
	}
	
	public Criteria(Long pageNum, Long amount) {
		this.pageNum = pageNum;
		this.amount = amount;
	}
	
}
