package com.yoo.task;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.yoo.domain.BoardAttachVO;
import com.yoo.service.BoardService;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class FileCheckTask {

	@Autowired
	private BoardService boardService;
	
	private String getFolderYesterDay() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		Calendar cal = Calendar.getInstance();
		
		cal.add(Calendar.DATE, -1);
		
		String str = sdf.format(cal.getTime());
		
		return str.replace("-", File.separator);
		
	}
	
	/**
	 * @Description : corn은 원래 유닉스 계열에서 사용되는 스케줄러 프로그램 이름이지만
	 *                워낙 다른곳에서 많이 사용되다보니 각종 언어나 기술에 맞는 라이브러리
	 *                형태로 많이 사용된다
	 *                
	 *                <순서대로 의미>
	 *                첫번째 : 초(0~59)
	 *                두번째 : 분(0~59)
	 *                세번째 : 시간(0~23)
	 *                네번째 : 월(1~31)
	 *                다섯번째 : 일(1~12)
	 *                여섯번째 : 주(1~7)
	 *                일골번째 : 연도(설정에따라 다름)
	 *                
	 *                <문자의미>
	 *                * : 모든수
	 *                ? : 제외
	 *                - : 기간
	 *                , : 특정시간
	 *                / : 시작 시간과 반복시간
	 *                L : 마지막
	 *                W : 가까운 평일
	 *                
	 * **/
	@Scheduled(cron = "0 * * * * *")
	public void checkFiles()throws Exception {
		
		log.warn("File Check Task run ....................");
		log.warn(new Date());
		
		//get Old FileDate
		List<BoardAttachVO> oldfileList = boardService.getOldFiles();
		
		/**
		 * @Description :  Paths.get(" C:\\upload"  저기 저 앞에 C앞에 공백 때문에 에러남
		 *                 한시간 삽질함 .. 잊지말자 공백 ,... 꼭 확인하자
		 *                  
		 *                 * 에러 내용 : java.nio.file.InvalidPathException: Illegal char <:>
	     */
		//DB에서 받아온 데이터를 기준으로 파일 경로+파일명을 만듬
		List<Path> fileListPahts = oldfileList.stream()
											  .map( vo -> Paths.get("C:\\upload"
													  			   , vo.getUploadPath() + "\\"
													  			   + vo.getUuid() + "_" + vo.getFileName() ))
											  .collect(Collectors.toList());
		// 이미지파일 경우 썸네일도 추출
		oldfileList.stream()
				   .filter((vo)->vo.isFileType())
				   .map((vo)->Paths.get("C:\\upload"
			  			   , vo.getUploadPath() + "\\s_"
			  			   + vo.getUuid() + "_" + vo.getFileName() ))
				   .forEach(p->fileListPahts.add(p));

		log.warn("=======================================");
		
		fileListPahts.forEach(p->log.warn("Base File List Up ::: " + p));
		
		//files in yesterday directory
		File targetDir = Paths.get("C:\\Upload",getFolderYesterDay()).toFile();
		
		File[] removeFiles = targetDir.listFiles( (file) -> 
													fileListPahts.contains(file.toPath()) == false
												);
		
		log.warn("--------------------- 최종 삭제 목록 -----------------------");
		
		Arrays.asList(removeFiles).forEach(data -> {
				log.warn("Delete Success List ::: " + data);
				data.delete();
			});
		
	}
	
}
