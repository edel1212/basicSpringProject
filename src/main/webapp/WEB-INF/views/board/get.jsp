<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../includes/header.jsp" %>
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
            <button id="modify" type="button" class="btn btn-default">Modify</button>
            <button id="delete" type="button" class="btn btn-default">Delete</button>
            <button id="list" type="button" class="btn btn-default">
              List
            </button>
          
        </div>
      </div>
    </div>
  </div>
  
  <!-- Reply_box -->
	<div class='row card-body'>
		<div class='col-lg-12'>
			<div class='panel panel-default'>
				<div class='panel-heading'>
					<i class='fa fa-comments fa-fw'></i>
					Relpy						
				</div>
				<!-- /panel-heading  -->
				
				<div class='panel-body'>
					<ul class='chat'>
						<li class="left clear-fix" data-rnp='12'>
							<div>
								<div class='header'>
									<strong class='primery-font'>회원만 댓글을 남길 수 있습니다.</strong>
									<small class='pull-right text-muted'>20XX-XX-XX XX:XX</small>
								</div>
								<!-- /header -->
								<p>댓글이 업습니다! 댓글을 남겨주세요.</p>
							</div>
						</li>
						<!-- clear-fix -->
					</ul>
					<!-- /chat -->
				</div>
				<!-- /panel-body -->
			</div>
			<!-- /panel panel-default -->
		</div>
		<!-- /col-lg-12 -->
	</div>
	<!-- /row -->   
  
</div>
<script src="/resources/js/board/get.js"></script>
<%@include file="../includes/footer.jsp" %>
