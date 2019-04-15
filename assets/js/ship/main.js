$(document).ready(function () {
	$(".ztree_box").height($(window).height()-150);
});
	  
$(window).resize(function () {
	$(".ztree_box").height($(window).height()-150);
}).resize();




$(function(){
  
  $(".search_box .input").keydown(function(){
	  if($(this).val()==''){
		  $(this).parent().children(".input_clear").hide();
	  }else{
		  $(this).parent().children(".input_clear").show();
		  $(".search_result").show();
	  }
  });
  $(".input_clear").click(function(){
	  $(this).parent().find('.input').val('');
	  $(this).hide();
	  $(".search_result").hide();
  });
  $(".tree_t").click(function(){
	  $(".ztree_main").toggle();
  });
  
  $(".left_tool_clo").click(function(){
	  $(".search_box").hide();
	  $(".ztree_main").hide();
	  $(".left_tool_open").show();
  });
  
  $(".left_tool_open").click(function(){
	  $(".search_box").show();
	  $(".left_tool_open").hide();
  });
  
  $(".ztree_main_clo").click(function(){
	  $(".ztree_main").hide();
  });
  
  $(".right_tool_clo").click(function(){
	  $(".right_tool_open").show();
	  $(".right_tool").hide();
  });
  
  $(".right_tool_open").click(function(){
	  $(".right_tool_open").hide();
	  $(".right_tool").show();
  });
  
  
  $(".right_tool_btn3").click(function(){
	  $(".mark_box").hide();
	  $('.typhoon_box').toggle();
  });
  
  $(".right_tool_btn4").click(function(){
	  $('.typhoon_box').hide();
	  $('.mark_box2').hide();
	  $('.mark_box1').toggle();
  });
  
  $(".right_tool_btn5").click(function(){
	  $('.typhoon_box').hide();
	  $('.mark_box1').hide();
	  $('.mark_box2').toggle();
  });
  
  $(".mark_box .mark_box_t .clo").click(function(){
	  $(".mark_box").hide();
  });
  
  $(".mark_list .item .tit").click(function(){
	  if($(this).parent(".item").hasClass('item_hide')){
		$(this).parent(".item").removeClass('item_hide');
		$(this).siblings(".con").show();
	  }else {
		$(this).parent(".item").addClass('item_hide');
		$(this).siblings(".con").hide();
	  }
  });
  
  $(".ztree_main_t ul li").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
	$(".ztree_main_m").children(".ztree_box:eq("+$(this).index()+")").css("display","block").siblings(".ztree_box").css("display","none");
  });
  
  $(".m_checkbox label input").click(function(){
	if($(this).is(':checked')){ 
	  $(this).prop("checked", true);
	  $(this).parent().addClass("checked"); 
	}else{ 
	  $(this).prop("checked", false);  
	  $(this).parent().removeClass("checked");
	}
  });
  
});