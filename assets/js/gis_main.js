$(window).resize(function () {
	$("#wrap").height($(window).height());
	$(".main_wrap").height($(window).height());
	$(".left_tool_open_m").height($(window).height());
	$(".left_tool_m").height($(window).height());
	$(".ltab_box").height($(window).height()-$(".left_tool_m .pos").height()-$(".logo_left").height()-$(".search_box").height()-$(".ltab_main_t").height()-$(".left_foot").height()-60);
	$(".search_box2_m").height($(window).height()-$(".left_tool_m .pos").height()-$(".logo_left").height()-$(".search_box2_t").height()-$(".search_box2_ts").height()-$(".ltab_main_t").height()-$(".left_foot").height()-92);
	$(".map_main").height($(window).height());
    $(".ztree_box").height($(window).height()-205);
}).resize();



$(function(){
    $("#wrap").height($(window).height());
    $(".main_wrap").height($(window).height());
    $(".left_tool_open_m").height($(window).height());
    $(".left_tool_m").height($(window).height());
    $(".ltab_box").height($(window).height()-$(".left_tool_m .pos").height()-$(".logo_left").height()-$(".search_box").height()-$(".ltab_main_t").height()-$(".left_foot").height()-60);
    $(".search_box2_m").height($(window).height()-$(".left_tool_m .pos").height()-$(".logo_left").height()-$(".search_box2_t").height()-$(".search_box2_ts").height()-$(".ltab_main_t").height()-$(".left_foot").height()-92);
    $(".map_main").height($(window).height());
    $(".ztree_box").height($(window).height()-205);

  $(".left_clo").click(function(){
	  $(".left_tool").hide();
	  $(".left_tool_open").show();
	  $(".map_main .scale").css("left","122px");
	  $(".map_main .map_type").css("left","122px");
	  $(".map_main .copy").css("left","112px");
	  $(".map_main .map_tool").css("left","122px");
  });
  
  $(".left_open ,.left_tool_open .btn").click(function(){
	  $(".left_tool_open").hide();
	  $(".left_tool").show();
	  $(".map_main .scale").css("left","370px");
	  $(".map_main .map_type").css("left","370px");
	  $(".map_main .copy").css("left","360px");
	  $(".map_main .map_tool").css("left","370px");
	  $(".ltab_box").mCustomScrollbar({
			  scrollInertia:150
	  });
	  $(".search_box2_m").mCustomScrollbar({
			  scrollInertia:150
	  });
  });
  
  $(".right_tool_clo").click(function(){
	  $(".right_tool_clo").hide();
	  $(".right_tool_open").show();
	  $(".right_tool_m").hide();
  });
  
  $(".right_tool_open").click(function(){
	  $(".right_tool_open").hide();
	  $(".right_tool_clo").show();
	  $(".right_tool_m").show();
  });
  
  $(".rtool_nav2_open").click(function(){
	  if($(this).hasClass('on')){
		$(this).removeClass('on');
		$(".rtool_nav2").hide();
		$(".rtool_nav3").hide();
	  }else {
		$(this).addClass('on');
		$(".rtool_nav2").show();
	  }
  });
  
  $(".rtool_nav2 ul li a").click(function(){
	  if($(this).hasClass('on')){
		$(this).removeClass('on');
		$(".rtool_nav3").hide();
	  }else {
		$(this).addClass('on');
		$(".rtool_nav3").show();
	  }
  });
  
  
  $(".rtool_nav4_open").click(function(){
	  if($(this).hasClass('on')){
		$(this).removeClass('on');
		$(".rtool_nav4").hide();
	  }else {
		$(this).addClass('on');
		$(".rtool_nav4").show();
	  }
  });
  
  $(".ltab_main_t ul li").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
	$(".ltab_main_m").children(".ltab_box:eq("+$(this).index()+")").css("display","block").siblings(".ltab_box").css("display","none");
	$(".search_box").show();
	$(".search_box2").hide();
  });
  
  $(".login_box label input").click(function(){
	  
	  if($(this).is(':checked')){ 
		$(this).attr("checked","checked"); 
		$(this).parent().addClass("on"); 
	  }else{ 
		$(this).removeAttr("checked"); 
		$(this).parent().removeClass("on");
	  }
	  
  });
  
  $(".news_clo").click(function(){
	  $(".news_box_m a ,.news_list ,.news_clo").hide();
	  $(".news_open").show();
	  $(".news_box_m").css("width","64px");
  });
  
  $(".news_open").click(function(){
	  $(".news_box_m a ,.news_list ,.news_clo").show();
	  $(".news_open").hide();
	  $(".news_box_m").css("width","564px");
  });
    $(".ztree_main_t ul li").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".ztree_main_m").children(".ztree_box:eq("+$(this).index()+")").css("display","block").siblings(".ztree_box").css("display","none");
    });
    $(".ltab_box").mCustomScrollbar({
        scrollInertia:150
    });
    $(".search_box2_m").mCustomScrollbar({
        scrollInertia:150
    });
    $(".ztree_box").mCustomScrollbar({
        scrollInertia:150
    });
    $(".history_list_m").mCustomScrollbar({
        scrollInertia:150
    });
    $(".news_box_m").xslider({
        unitdisplayed:1,
        movelength:1,
        dir:"V",
        autoscroll:5000
    });
});

var setting = {
    view: {
        showLine: false
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

var zNodes =[
    { id:1, pId:0, name:"展开、折叠 自定义图标不同", open:true, iconOpen:"images/ztree/1.png", iconClose:"images/ztree/2.png"},
    { id:11, pId:1, name:"叶子节点1", open:true, icon:"images/ztree/1.png"},
    { id:41, pId:11, name:"叶子节点1", icon:"images/ztree/2.png"},
    { id:42, pId:11, name:"叶子节点2", icon:"images/ztree/2.png"},
    { id:43, pId:11, name:"叶子节点3", icon:"images/ztree/2.png"},
    { id:44, pId:11, name:"叶子节点1", icon:"images/ztree/2.png"},
    { id:45, pId:11, name:"叶子节点2", icon:"images/ztree/2.png"},
    { id:46, pId:11, name:"叶子节点3", icon:"images/ztree/2.png"},
    { id:12, pId:1, name:"叶子节点2", open:true, icon:"images/ztree/1.png"},
    { id:51, pId:12, name:"叶子节点1", icon:"images/ztree/2.png"},
    { id:52, pId:12, name:"叶子节点2", icon:"images/ztree/2.png"},
    { id:53, pId:12, name:"叶子节点3", icon:"images/ztree/2.png"},
    { id:54, pId:12, name:"叶子节点1", icon:"images/ztree/2.png"},
    { id:55, pId:12, name:"叶子节点2", icon:"images/ztree/2.png"},
    { id:56, pId:12, name:"叶子节点3", icon:"images/ztree/2.png"},
    { id:13, pId:1, name:"叶子节点3", icon:"images/ztree/1.png"},
    { id:2, pId:0, name:"展开、折叠 自定义图标相同", open:true, icon:"images/ztree/1.png"},
    { id:21, pId:2, name:"叶子节点1", icon:"images/ztree/2.png"},
    { id:22, pId:2, name:"叶子节点2", icon:"images/ztree/2.png"},
    { id:23, pId:2, name:"叶子节点3", icon:"images/ztree/2.png"},
    { id:3, pId:0, name:"不使用自定义图标", open:true },
    { id:31, pId:3, name:"叶子节点1"},
    { id:32, pId:3, name:"叶子节点2"},
    { id:33, pId:3, name:"叶子节点3"},
    { id:34, pId:3, name:"叶子节点3"},
    { id:35, pId:3, name:"叶子节点3"},
    { id:36, pId:3, name:"叶子节点3"},
    { id:37, pId:3, name:"叶子节点3"}

];

$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});