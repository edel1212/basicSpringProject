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
  
</div>
<script src="/resources/js/board/get.js"></script>
<%@include file="../includes/footer.jsp" %>
