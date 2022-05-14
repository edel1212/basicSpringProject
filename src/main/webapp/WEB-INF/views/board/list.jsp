<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@include file="../includes/header.jsp" %>
	    <!-- Begin Page Content -->
	    <div class="container-fluid">
	
	        <!-- Page Heading -->
	        <h1 class="h3 mb-2 text-gray-800">Tables</h1>
	        <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
	            For more information about DataTables, please visit the <a target="_blank"
	                href="https://datatables.net">official DataTables documentation</a>.</p>
	
	        <!-- DataTales Example -->
	        <div class="card shadow mb-4">
	            <div class="card-header py-3" style="display: flex;justify-content: space-between;">
	                <h6 class="m-0 font-weight-bold text-primary" style="line-height: 38px;">DataTables</h6>
	                <button id="regBtn" type="button" class="btn btn-xs pull-right">Register</button>
	            </div>
	            <div class="card-body">
	                <div class="table-responsive">
	                    <table class="table table-striped table-boredered table-hover" width="100%" cellspacing="0">
	                        <thead>
	                            <tr>
	                                <th>번호</th>
	                                <th>제목</th>
	                                <th>작성자</th>
	                                <th>작성일</th>
	                                <th>수정일</th>	                                
	                            </tr>
	                        </thead>
	                       
	                        <tbody id="board">
	                            
	                        </tbody>
	                    </table>
	                </div>
	            </div>
	        </div>
	
	    </div>
	    <!-- /.container-fluid -->
	
	</div>
	<!-- End of Main Content -->
    <script src="/resources/js/board/board.js"></script>
<%@include file="../includes/footer.jsp" %>
