package com.yoo.domain;

import lombok.Data;

@Data
public class Criteria {
	private Long pageNum;
	private Long amount;
	
	public Criteria() {
		this.pageNum = 0L;
		this.amount = 10L;
	}
	
	public Criteria(Long pageNum, Long amount) {
		this.pageNum = pageNum;
		this.amount = amount;
	}
	
}
