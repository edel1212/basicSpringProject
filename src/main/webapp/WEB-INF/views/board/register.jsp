<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../includes/header.jsp" %>
 <!-- Begin Page Content -->
	<div class="container-fluid">
	    
		<div class="row">
			<div class="col-lg-12">
				<h1 class="page-header">Board Register</h1>
			</div>			
		</div>
	
		<div class="row">
			<div class="col-lg-12">
				<div class='panel panel-default'>
					<div class='panel-heading'>Board Register</div>
					<div class='panel-body'>
						<form role="form">
							<div class="form-group">
				            	<label>Title</label>
				            	<input class="form-control" name='title' maxlength="100">
				         	</div>
				         	<div class="form-group">
				            	<label>Text area</label>
				            	<textarea class="form-control" rows="3" name="content"></textarea>
				         	</div>
				         	<div class="form-group">
					        	<label>Writer</label>
					        	<input class="form-control" name='writer'>
					        </div>
					        <button id="submit" type="button" class="btn btn-default">Submit</button>
						    <button id="reset" type="button" class="btn btn-default">Rest</button>
						</form>
					</div>
				</div>	
			</div>
		</div>
		
	</div>
	<script src="/resources/js/board/register.js"></script>
<%@include file="../includes/footer.jsp" %>