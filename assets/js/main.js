/**  spa v3.0.4 data:2018-12-04 */

layui.config({
    base: 'assets/module/'
}).extend({
    formSelects: 'formSelects/formSelects-v4',
    treetable: 'treetable-lay/treetable',
    dropdown: 'dropdown/dropdown',
    notice: 'notice/notice',
    step: 'step-lay/step',
    dtree: 'dtree/dtree',
    citypicker: 'city-picker/city-picker',
    tableSelect: 'tableSelect/tableSelect'
}).use(['layer', 'element', 'config', 'index', 'admin', 'laytpl'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var element = layui.element;
    var config = layui.config;
    var index = layui.index;
    var admin = layui.admin;
    var laytpl = layui.laytpl;

    // 检查是否登录
    if (!config.getToken()) {
        return location.replace('login.html');
    }

    // 获取用户信息   .json
    admin.req('userInfo', {}, function (obj) {
        if (200 == obj.code) {
            config.putUser(obj.data);
            $('#huName').text(obj.data.nickName);
        }
    }, 'get');

    // 加载侧边栏    .json
    admin.req('menus', {}, function (obj) {
        var routers = new Array();
        var k = 0;
        $.each(obj.data,function(key,value){
            laytpl(navigationBarBtn.innerHTML).render({id:key,name:value.name,num:k}, function (html) {
                $("#navigationBarBtnList").append(html);
            });
            if(value.menuVoList && value.menuVoList.length > 0){
                laytpl(sideNav.innerHTML).render({id:key,menuVoList:value.menuVoList,num:k}, function (html) {
                    $("#menuList").append(html);
                    element.render('nav');
                });
                //注册路由
                index.regRouter(value.menuVoList);
            }
            k++;
        });
        //加载缓存中的路由
        var regTempRouter =  layui.data(config.tableName).regTempRouter;
        if(regTempRouter){
            index.regTempRouter(regTempRouter);
        }
        index.loadHome({  // 加载主页
            url: '#/console/console1',
            name: '<i class="layui-icon layui-icon-home"></i>'
        });
    }, 'get');

    // 退出登录
    $('#btnLogout').click(function () {
        layer.confirm('确定退出登录？', {
            skin: 'layui-layer-admin'
        }, function () {
            config.removeToken();
            location.replace('login.html')
        });
    });

    // 修改密码
    $('#setPsw').click(function () {
        admin.open({
            id: 'pswDialog',
            title: '修改密码',
            shade: 0,
            url: 'components/tpl/password.html'
        });
    });

    // 移除loading动画
    setTimeout(function () {
        admin.removeLoading();
        // 提示
       /* if (!config.pageTabs) {
            layer.confirm('SPA版本默认关闭多标签功能，你可以在设置界面开启', {
                skin: 'layui-layer-admin',
                area: '280px',
                title: '温馨提示',
                shade: 0,
                btn: ['打开设置', '知道了']
            }, function (i) {
                layer.close(i);
                $('a[ew-event="theme"]').trigger('click');
            });
        }*/
    }, 300);
    $("#monitor").click(function () {
        $(".layui-side").hide();
        $(".layui-layout-admin .layui-body ").addClass("wide");
    });
    $("#sysSetting").click(function () {
        $(".layui-side").show();
        $(".layui-layout-admin .layui-body ").removeClass("wide");
    });
});
