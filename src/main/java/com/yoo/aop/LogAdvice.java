package com.yoo.aop;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j;

@Aspect
@Log4j
@Component
public class LogAdvice {

	@Around( "execution(* com.yoo.service.*Impl.*(..))" )
	public Object logMethod(ProceedingJoinPoint pjp) {
		log.info("----------------------------------------------");
		log.info("TargetClass  ::: " + pjp.getTarget());
		log.info("Param   ::: " + Arrays.toString(pjp.getArgs())) ;
		log.info("----------------------------------------------");
		//invoke method (호출하는 메서드)
		Object result = null;
		try {
			result = pjp.proceed();
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
}
