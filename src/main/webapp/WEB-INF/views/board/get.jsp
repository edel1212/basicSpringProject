<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../includes/header.jsp" %>
<style>	
	.chat {list-style: none;padding: 5px;background: white;border-radius: 10px;}
	.chat li{margin: 10px;border-bottom: 1px dotted gray;}
	.chat .replyBody {
   	 					margin-bottom: 16px;
    					display: flex;
    					justify-content: space-between;
					}
	.chat p{overflow: hidden;word-wrap:break-word;}
	.chat .header{display: flex;justify-content: space-between;}
	
	.filebox label {
	  display: inline-block;
	  padding: .5em .75em;
	  color: #fff;
	  font-size: inherit;
	  line-height: normal;
	  vertical-align: middle;
	  cursor: pointer;
	  border-bottom-color: #e2e2e2;
	  border-radius: .25em;
	  background-color: #337ab7;
  	border-color: #2e6da4;
	}
	
	.filebox input[type="file"] {  /* 파일 필드 숨기기 */
	  position: absolute;
	  width: 1px;
	  height: 1px;
	  padding: 0;
	  margin: -1px;
	  overflow: hidden;
	  clip:rect(0,0,0,0);
	  border: 0;
	}
</style>
<!-- Begin Page Content -->
<div class="container-fluid">

  <div class="row">
    <div class="col-lg-12">
      <h1 class="page-header">Board Read</h1>
    </div>
  </div>
  
  <div class="row">
    <div class="col-lg-12">
      <div class="panel panel-default">
        <div class="panel-heading">Board Read Page</div>
        <div class="panel-body">
          
            <div class="form-group">
              <label>Title</label>
              <input class="form-control" name="title" maxlength="100" readonly="readonly" />
            </div>
            <div class="form-group">
              <label>Text area</label>
              <textarea class="form-control" rows="3" name="content" readonly="readonly"></textarea>
            </div>
            <div class="form-group">
              <label>Writer</label>
              <input class="form-control" name="writer" readonly="readonly" />
            </div>
            
            <div class="row">
            	<div class="col-lg-12 fileWrap" style="display: flex;justify-content: space-between;align-items: flex-end;">
            		<div class="panel-heading" style="height:40px">File Attach</div>
           		</div>
           		<div class="uploadResult">
					<ul>
						<!-- script -->
					</ul>
				</div>
            </div>
            
             <div class="form-group">
	            <button id="modify" type="button" class="btn btn-default">Modify</button>
	            <button id="delete" type="button" class="btn btn-default">Delete</button>
	            <button id="list" type="button" class="btn btn-default">List</button>
             </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Reply_box -->
	<div class='row card-body'>
		<div class='col-lg-12'>
			<!-- Reply List -->
			<div class='panel panel-default'>
				<div class='panel-heading'>
					<i class='fa fa-comments fa-fw'></i>
					Relpy List						
				</div>
				<!-- /panel-heading  -->
				<div class='panel-body'>
					<ul class='chat'>
						<li class="left clear-fix" data-rno='0'>
							<div>
								<div class='header' >
									<strong class='primery-font'>Only members can write.</strong>
									<small class='pull-right text-muted'>20XX-XX-XX XX:XX</small>
								</div>
								<!-- /header -->
								<p>Please add comment.</p>
							</div>
						</li>
						<!-- clear-fix -->
					</ul>
					<!-- /chat -->
				</div>
				<!-- /panel-body -->
				
				<!-- add Reply -->
				<div class='panel panel-default'>
					<div class='panel-heading' style="display: flex;justify-content: space-between;">
						<div style="line-height: 38px;">
							<i class='fa fa-pen fa-fw'></i>
							Relpy Write						
						</div>
						<button id="addReply" type="button" class="btn btn-default">Add Reply</button>
					</div>
				</div>
				<!-- /panel-heading  -->
				<div class='panel-body'>
					<textarea id="replyText" rows="" cols="" style="width:100%;margin-top:5px; border:none;resize:none;height:100px"></textarea>
				</div>
			</div>
			<!-- /panel panel-default -->
		</div>
		<!-- /col-lg-12 -->
	</div>
	<!-- /row -->   
  
</div>
<script type="module" src="/resources/js/board/get.js"></script>
<%@include file="../includes/footer.jsp" %>
