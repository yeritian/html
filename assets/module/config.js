/** EasyWeb spa v3.0.7 data:2019-01-17 */

layui.define(function (exports) {

    var config = {
        base_server: 'http://127.0.0.1:8088/', // 接口地址，实际项目请换成http形式的地址
        tableName: 'intertion-map',  // 存储表名
        pageTabs: false,   // 是否开启多标签
        openTabCtxMenu: true,   // 是否开启Tab右键菜单
        maxTabNum: 20,  // 最多打开多少个tab
        viewPath: 'components', // 视图位置
        defaultTheme: 'admin',  // 默认主题
        // 获取缓存的token
        getToken: function () {
            return layui.data(config.tableName).token;
        },
        // 清除token
        removeToken: function () {
            layui.data(config.tableName, {
                key: 'token',
                remove: true
            });
        },
        // 缓存token
        putToken: function (token) {
            layui.data(config.tableName, {
                key: 'token',
                value: token
            });
        },
        // 当前登录的用户
        getUser: function () {
            return layui.data(config.tableName).login_user;
        },
        // 缓存user
        putUser: function (user) {
            layui.data(config.tableName, {
                key: 'login_user',
                value: user
            });
        },
        // 获取用户所有权限
        getUserAuths: function () {
            // var authorities = config.getUser().authorities;
            var auths = [];
            /* for (var i = 0; i < authorities.length; i++) {
                auths.push(authorities[i].authority);
            } */
            return auths;
        },
        // ajax请求的header
        getAjaxHeaders: function () {
            var headers = [];
            var token = config.getToken();
            if (token) {
                headers.push({
                    name: 'Authorization',
                    value: token.access_token
                });
            }
            return headers;
        },
        // ajax请求结束后的处理，返回false阻止代码执行
        ajaxSuccessBefore: function (res) {
            if (res.code == 400) {
                layer.msg('登录信息有误，请重新登录!~~', {icon: 2}, function () {
                    config.removeToken();
                    location.replace('login.html');
                }, 1000);
                return false;
            } else if (res.code == 401) {
                config.removeToken();
                layer.msg('由于您长时间未进行任何操作，您的登录信息已过期!~~', {icon: 2}, function () {
                    location.replace('login.html');
                }, 1000);
                return false;
            } else if (res.code == 403) {
                if (this.getToken()) {
                    layer.msg('没有访问权限', {icon: 2});
                } else {
                    location.replace('login.html');
                }
                ;
                return false;
            } else if (res.code == 404) {
                layer.msg('404目标不存在', {icon: 2});
            }
            return true;
        },
        // 路由不存在处理
        routerNotFound: function (r) {
            // location.replace('#/template/error/error-404');
            layer.alert('路由' + location.hash + '不存在', {
                title: '提示',
                skin: 'layui-layer-admin',
                btn: [],
                offset: '30px',
                anim: 6,
                shadeClose: true
            });
        }
    };

    exports('config', config);
});
