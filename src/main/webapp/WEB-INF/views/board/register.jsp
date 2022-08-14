<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> 
<%@include file="../includes/header.jsp" %>
<style>
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
      <h1 class="page-header">Board Register</h1>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-12">
      <div class="panel panel-default">
        <div class="panel-heading">Board Register</div>
        <div class="panel-body">
          <form id="registerForm" role="form">
            <div class="form-group">
              <label>Title</label>
              <input class="form-control" name="title" maxlength="100" />
            </div>
            <div class="form-group">
              <label>Text area</label>
              <textarea class="form-control" rows="3" name="content"></textarea>
            </div>

            <div class="row">
            	<div class="col-lg-12" style="display: flex;justify-content: space-between;align-items: flex-end;">
            		<div class="panel-heading" style="height:40px">File Attach</div>
            		<div class="panel-body filebox">
            			<label for="fileInput">Upload</label>
            			<input id="fileInput" type="file" name="uploadFile" multiple >
            		</div>
            	</div>
           		<div class="uploadResult">
					<ul>
						<!-- script -->
					</ul>
				</div>
            </div>
            
            <button id="submit" type="button" class="btn btn-default">Submit</button>
            <button id="reset" type="button" class="btn btn-default">
              Rest
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="/resources/js/board/register.js"></script>
<%@include file="../includes/footer.jsp" %>
