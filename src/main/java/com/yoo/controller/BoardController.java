package com.yoo.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.yoo.domain.AttachFileDTO;
import com.yoo.domain.BoardVO;
import com.yoo.domain.Criteria;
import com.yoo.domain.PageDTO;
import com.yoo.service.BoardService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import net.coobird.thumbnailator.Thumbnailator;

@Controller
@Log4j
@RequestMapping("/board/*")
@AllArgsConstructor
public class BoardController {

	private BoardService boardService;
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/list")
	public String list(Model model) {
		log.info("list Page");
		
		return "/board/list";
	}
	
	@PostMapping("/getList")
	@ResponseBody
	public Map<String, Object> getList(@RequestBody Criteria cri){
		log.info("getList");
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("pageMaker", new PageDTO(cri, boardService.getTotalCount(cri)));
		result.put("list", boardService.getList(cri));
		
		return result;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/register")
	public String register(Model mdoel) {
		log.info("register..");
		return "/board/register";
	}
	
	@PostMapping("/register")
	@ResponseBody
	public Map<String, Integer> register(@RequestBody BoardVO vo, HttpServletRequest request) {
		log.info("register");
		HttpSession session = request.getSession();
		vo.setWriter(String.valueOf(session.getAttribute("userId")));
		log.info(vo);
		Map<String, Integer> result = new HashMap<String, Integer>();
		result.put("result", boardService.register(vo));
		return result;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/get")
	public String get(String bno,Model model, HttpServletRequest request) {
		log.info("get Page");
		log.info("bno :: " + bno);
		HttpSession session = request.getSession();
		model.addAttribute("bno", bno);
		model.addAttribute("userId", session.getAttribute("userId"));
		return "/board/get";
	}
	
	@ResponseBody
	@PostMapping("/get")
	public BoardVO get(@RequestBody Long bno) {
		BoardVO result = boardService.get(bno);
		return result;
	}
	
	@ResponseBody
	@PostMapping("/modify")
	public int modify(@RequestBody BoardVO vo) {
		
		int result = boardService.update(vo);
		
		return result;
	}
	
	@ResponseBody
	@PostMapping("/delete")
	public int delete(@RequestBody Long bno) {	
		return boardService.delete(bno);
	}
	
	/**********************************
	 * 								  *
	 * fileUpload                     *
	 *                                *
	 ******************************* **/
	
	@PostMapping(value = "/uploadAction", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public ResponseEntity<List<AttachFileDTO>> uploadNewVerEntity(MultipartFile[] uploadFile){
		
		List<AttachFileDTO>  list = new ArrayList<AttachFileDTO>();
		String uploadFolder = "C:\\upload";
		
		String uploadFolderPath = getFolder();
		
		//Make Folder - - - - - -
		File uploadPath = new File(uploadFolder,uploadFolderPath);
		
		if(uploadPath.exists()  == false) { // 해당 디렉토리가 없을경우
			uploadPath.mkdirs();
		}
		
		for(MultipartFile multipartFile : uploadFile) {
			AttachFileDTO attachDTO = new AttachFileDTO();
			
			String uploadFileName = multipartFile.getOriginalFilename();
			attachDTO.setFileName(uploadFileName);
			UUID uuid = UUID.randomUUID();
			uploadFileName = uuid.toString() + "_" + uploadFileName;
			try {
				File saveFile = new File(uploadPath,uploadFileName); 
				multipartFile.transferTo(saveFile);
				
				attachDTO.setUuid(uuid.toString());
				attachDTO.setUploadPath(uploadFolderPath);
				
				if(checkImageType(saveFile)) {
					attachDTO.setFileType(true);
					
					FileOutputStream thumbnail = new FileOutputStream(new File(uploadPath, "s_" + uploadFileName));
					
					Thumbnailator.createThumbnail(multipartFile.getInputStream(), thumbnail, 100, 100);
					thumbnail.close();
				}
				
				list.add(attachDTO);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return new ResponseEntity<List<AttachFileDTO>>(list, HttpStatus.OK);
	}
	
	/**
	 * @Description : 오늘 날짜에 맞는 문자열 생성
	 * */
	private String getFolder() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar today = Calendar.getInstance();
		String str = sdf.format(today.getTime());
		//File.separator "-" 를 파일 구문자로 바꾸는 코드
		return str.replace("-", File.separator);
	}
	
	/**
	 * @Description : 업로든 되는 파일이 image인지 체크
	 * */
	private boolean checkImageType(File file) {
		try {
			String contentType = Files.probeContentType(file.toPath());
			log.info("contentType ::: " + contentType);
			return contentType.startsWith("image");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	@GetMapping("/display")
	@ResponseBody
	public ResponseEntity<byte[]> getFile(String fileName){
		log.info("fileName :: " + fileName);
		
		File file = new File("C:\\upload\\"+fileName);
		
		log.info("file :: " + file);
	
		ResponseEntity<byte[]> result = null;
		
		try {
			//Content-Type 을 담아줄 Header 객체
			HttpHeaders header = new HttpHeaders();
			
			/** @Description : 해당파일의 확장자로 MINE 타입을 반환합니다 */
			header.add("Content-Type", Files.probeContentType(file.toPath()));
			
			log.info("header ::: " + header); 
			
			result = new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(file),header,HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GetMapping(value = "/download" , produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	@ResponseBody
	public ResponseEntity<Resource> downloadFile(@RequestHeader("User-Agent") String userAgent // 디바이스의 정보를 할수있 정보
												,String fileName){ //파일명 기간+파일명
		
		log.info("fileName :::" + fileName);//fileName :::/2022/06/27/file.png
		
		log.info("userAgent ::: " + userAgent);
		
		//지정경로의 File을 가져와 객체로만듬
		Resource resource = new FileSystemResource("c://upload//"+fileName);
	
		log.info("resource ::: " + resource) ;// resource ::: file [c:\\upload\2022\06\27\file.png]
		
		if(resource.exists() == false) { //resource가 존재하지 않을 경우!
			return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
		}
		
		String resoucreName = resource.getFilename();
		
		if(userAgent.contains("Edge")) {
			log.info("Edge!!!");
		}
		String resourceOriginalName =	resoucreName.substring(resoucreName.lastIndexOf("_")+1);
		
		log.info("resoucreName::: " + resoucreName);
		log.info("resourceOriginalName::: " + resourceOriginalName);
		
		HttpHeaders headers = new HttpHeaders();
		
		try {
			headers.add(
							  "Content-Disposition"
							, "attachment ; filename = " + new String(resourceOriginalName.getBytes("UTF-8")
							, "ISO-8859-1")
						);
			log.info("headers ::: " + headers);//headers ::: [Content-Disposition:"attachment ; filename = file.png"]
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<Resource>(resource,headers,HttpStatus.OK);
		
	}
	
	@PostMapping("/deleteFile")
	@ResponseBody
	public ResponseEntity<String> deleteFile(@RequestBody AttachFileDTO vo) throws Exception{
		
		log.info("jsonObject  ::: "  + vo);
		
		String fileName = vo.getFileName();
		log.info("fileName  ::: " + fileName );
		
		String type = vo.getType();
		log.info("type  ::: " + type);
		
		File file;
		
		try {
			file = new File("C:\\upload\\"+ URLDecoder.decode(fileName,"UTF-8"));
			file.delete(); //파일 삭제
			
			if("image".equals(type)) {
				String largeFileName = file.getAbsolutePath().replace("s_", "");
				file = new File(largeFileName);
				file.delete();
			}
		} catch (UnsupportedEncodingException e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<String>("delete",HttpStatus.OK);
	}
	
	//__EOF__
}
