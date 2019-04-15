// 以下代码是配置layui扩展模块的目录，以及加载主题
layui.config({
    base: '/module/'
}).extend({
    formSelects1: 'formSelects/formSelects-v4',
    treetable1: 'treetable-lay/treetable',
    step1: 'step-lay/step'
}).use(['layer'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    $.ajaxSetup ({
        cache: false //关闭AJAX缓存
    });

    // 加载设置的主题
    var theme = layui.data('easyweb').theme;
    if (theme) {
        layui.link('/assets/css/theme/' + theme + '.css');
    }

    // 移除loading动画
    setTimeout(function () {
        $('.page-loading').remove();
    }, window == top ? 500 : 300);
});

// 移除主题
function removeTheme() {
    layui.jquery('link[id^=layuicss-assetscsstheme]').remove();
}
var __dic = [];
function showDic(type,id,val){
    var dic = __dic[type];
    var config = layui.config;
    if(dic){
        layui.jquery("#"+id).append("<option value=''>请选择</option>");
        if(val){
            for(var i=0,j=dic.length;i<j;i++){
                if(val == dic[i].id){
                    layui.jquery("#"+id).append("<option value='"+dic[i].id+"' selected>"+dic[i].name+"</option>");
                }else{
                    layui.jquery("#"+id).append("<option value='"+dic[i].id+"'>"+dic[i].name+"</option>");
                }
            }
        }else{
            for(var i=0,j=dic.length;i<j;i++){
                layui.jquery("#"+id).append("<option value='"+dic[i].id+"'>"+dic[i].name+"</option>");
            }
        }
        layui.form.render('select');
    }else {
        layui.jquery.getJSON( config.base_server + 'dic/lstType?token=' + config.getToken().access_token,{id:type},function (data) {
            if(data.code == 200){
                layui.jquery("#"+id).append("<option value=''>请选择</option>");
                dic = data.data;
                __dic[type] = dic;
                if(val){
                    for(var i=0,j=dic.length;i<j;i++){
                        if(val == dic[i].id){
                            layui.jquery("#"+id).append("<option value='"+dic[i].id+"' selected>"+dic[i].name+"</option>");
                        }else{
                            layui.jquery("#"+id).append("<option value='"+dic[i].id+"'>"+dic[i].name+"</option>");
                        }
                    }
                }else{
                    for(var i=0,j=dic.length;i<j;i++){
                        layui.jquery("#"+id).append("<option value='"+dic[i].id+"'>"+dic[i].name+"</option>");
                    }
                }
                layui.form.render('select');
            }
        });
    }
}
function showDicTitle(type,val){
    var ret = "";
    var dic = __dic[type];
    var config = layui.config;
    if(dic){
        for(i=0,j=dic.length;i<j;i++){
            if(dic[i].id == val){
                ret = dic[i].name;
                return ret;
            }
        }
    }else{
        layui.jquery.ajaxSettings.async = false;
        layui.jquery.getJSON( config.base_server + 'dic/lstType?token=' + config.getToken().access_token,{id:type},function (data) {
            if(data.code == 200){
                dic = data.data;
                __dic[type]=dic;
                for(i=0,j=dic.length;i<j;i++){
                    if(dic[i].id == val){
                        ret = dic[i].name;
                    }
                }
            }
        });
        layui.jquery.ajaxSettings.async = true;
        return ret;
    }
}