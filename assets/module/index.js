/**  spa v3.0.7 data:2019-01-17 */

layui.define(['layer', 'config', 'admin', 'laytpl', 'element', 'form', 'layRouter', 'contextMenu'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var config = layui.config;
    var admin = layui.admin;
    var element = layui.element;
    var form = layui.form;
    var layRouter = layui.layRouter;
    var contextMenu = layui.contextMenu;
    var bodyDOM = '.layui-layout-admin>.layui-body';
    var tabDOM = bodyDOM + '>.layui-tab';
    var sideDOM = '.layui-layout-admin>.layui-side>.layui-side-scroll';
    var headerDOM = '.layui-layout-admin>.layui-header';
    var tabFilter = 'admin-pagetabs';
    var navFilter = 'admin-side-nav';
    var titleDOM = bodyDOM + '>.layui-body-header>.layui-body-header-title';

    var index = {
        mTabPosition: undefined, // 当前选中Tab
        // 使用递归循环注册
        regRouter: function (menus) {
            $.each(menus, function (i, data) {
                if (data.url && data.url.indexOf('#') == 0) {
                    var hashPath = index.getHashPath(data.url);
                    layRouter.reg(hashPath, function (r) {
                        index.loadView({
                            menuId: r.href,
                            menuPath: config.viewPath + hashPath + '.html',
                            menuName: data.name
                        });
                    });
                }
                if (data.subMenus) {
                    index.regRouter(data.subMenus);
                }
            });
        },
        regTempRouter: function (tempMenus) {
            if (tempMenus.url && tempMenus.url.indexOf('#') == 0) {
                var hashPath = index.getHashPath(tempMenus.url);
                layRouter.reg(hashPath, function (r) {
                    index.loadView({
                        menuId: r.href,
                        menuPath: config.viewPath + hashPath + '.html',
                        menuName: tempMenus.name
                    });
                });
                layui.data(config.tableName, {
                    key: 'regTempRouter',
                    value: tempMenus
                });
            }
        },
        // 路由加载组件
        loadView: function (param) {
            var menuId = param.menuId;
            var menuPath = param.menuPath;
            var menuName = param.menuName;
            var contentDom = bodyDOM, loadingDOM = bodyDOM;
            var flag;  // 选项卡是否添加
            // 判断是否开启了选项卡功能
            if (config.pageTabs) {
                var tabId = index.getHashPath('#' + menuId);
                $(tabDOM + '>.layui-tab-title>li').each(function (index) {
                    if ($(this).attr('lay-id') === tabId) {
                        flag = true;
                        return false;
                    }
                });
                if (!flag) {
                    if ($(tabDOM + '>.layui-tab-title>li').length >= config.maxTabNum) {
                        layer.msg('最多打开' + config.maxTabNum + '个选项卡', {icon: 2});
                        index.go(index.mTabPosition);
                        return;
                    }
                    element.tabAdd(tabFilter, {
                        title: '<span class="title">' + menuName + '</span>',
                        content: '<div lay-id="' + tabId + '" lay-url="' + menuId + '"></div>',
                        id: tabId
                    });
                } else if (menuId != $(tabDOM + '>.layui-tab-content>.layui-tab-item>div[lay-id="' + tabId + '"]').attr('lay-url')) {
                    $(tabDOM + '>.layui-tab-content>.layui-tab-item>div[lay-id="' + tabId + '"]').attr('lay-url', menuId);
                    flag = false;
                }
                contentDom = tabDOM + '>.layui-tab-content [lay-id="' + tabId + '"]';
                loadingDOM = $(contentDom).parent();
                if (!param.noChange && !layRouter.isRefresh) {
                    element.tabChange(tabFilter, tabId);
                }
                admin.rollPage('auto');
                $(window).resize();
            }
            if (!flag || layRouter.isRefresh) {
                admin.showLoading(loadingDOM);
                $(contentDom).load(menuPath, function () {
                    layRouter.isRefresh = false;
                    element.render('breadcrumb');
                    setTimeout(function () {
                        admin.removeLoading(loadingDOM);
                    }, 150);
                });
                // 记录当前Tab位置
                index.mTabPosition = menuId;
            }
            $('.layui-table-tips-c').trigger('click'); // 切换tab关闭表格内浮窗
            if (!layRouter.isRefresh) {
                admin.activeNav(menuId);
                // 移动设备切换页面隐藏侧导航
                if (admin.getPageWidth() <= 750) {
                    admin.flexible(true);
                }
            }
        },
        // 加载主页
        loadHome: function (param) {
            var hashPath = index.getHashPath(param.url);
            if (config.pageTabs) {
                $(bodyDOM).addClass('tab-open');
                index.loadView({
                    menuId: hashPath,
                    menuPath: config.viewPath + hashPath + '.html',
                    menuName: param.name,
                    noChange: true
                });
            }
            layRouter.init({
                index: hashPath,
                notFound: function (r) {
                    config.routerNotFound && config.routerNotFound(r);
                }
            });
        },
        // 打开新页面
        openNewTab: function (param) {
            index.regTempRouter({
                name: param.title,
                url: param.url
            });
            index.go(param.url.substring(1));
        },
        // 关闭选项卡
        closeTab: function (menuId) {
            element.tabDelete(tabFilter, menuId);
        },
        // 跳转页面
        go: function (hash) {
            layRouter.go(hash);
        },
        // 获取hash的view路径
        getHashPath: function (hash) {
            var layRouter = layui.router(hash);
            var hashPath = '';
            for (var i = 0; i < layRouter.path.length; i++) {
                hashPath += ('/' + layRouter.path[i]);
            }
            return hashPath;
        },
        // 设置Tab标题
        setTabTitle: function (param) {
            var tabId = param.url;
            var title = param.title;
            if (!tabId) {
                tabId = index.getHashPath();
            }
            if (config.pageTabs) {
                $(tabDOM + '>.layui-tab-title>li[lay-id="' + tabId + '"] .title').text(title);
            } else {
                $(titleDOM).text(title);
                $(titleDOM).next('.layui-breadcrumb').find('cite').last().text(title);
            }
        }
    };

    // tab选项卡切换监听
    element.on('tab(' + tabFilter + ')', function (data) {
        var layId = $(this).attr('lay-id');
        index.mTabPosition = layId;  // 记录当前Tab位置
        index.go($(tabDOM + '>.layui-tab-content>.layui-tab-item>div[lay-id="' + layId + '"]').attr('lay-url'));
    });

    // 监听侧导航栏点击事件
    element.on('nav(' + navFilter + ')', function (elem) {
        var $that = $(elem);
        if ('true' === $(sideDOM + '>.layui-nav-tree').attr('lay-accordion') && $that.parent().hasClass('layui-nav-item')) {
            if ($that.parent().hasClass('layui-nav-itemed') || $that.parent().hasClass('layui-this')) {
                $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-nav-itemed');
                $that.parent().addClass('layui-nav-itemed');
            }
            $that.trigger('mouseenter');
        } else {
            admin.setNavHoverCss($that.parentsUntil('.layui-nav-item').parent().children().eq(0));
        }
    });

    // 是否开启footer
    var openFooter = layui.data(config.tableName).openFooter;
    if (openFooter != undefined && openFooter == false) {
        $('body.layui-layout-body').addClass('close-footer');
    }

    // 是否开启多标签
    var openTab = layui.data(config.tableName).openTab;
    if (openTab != undefined) {
        config.pageTabs = openTab;
    }

    // 多系统切换事件
    $('body').off('click.navMore').on('click.navMore', '[nav-bind]', function () {
        var navId = $(this).attr('nav-bind');
        $('ul[lay-filter="' + navFilter + '"]').addClass('layui-hide');
        $('ul[nav-id="' + navId + '"]').removeClass('layui-hide');
        if (admin.getPageWidth() <= 750) {
            admin.flexible(false);  // 展开侧边栏
        }
        $(headerDOM + '>.layui-nav .layui-nav-item').removeClass('layui-this');
        $(this).parent('.layui-nav-item').addClass('layui-this');
    });

    // 开启Tab右键菜单
    if (config.openTabCtxMenu && config.pageTabs) {
        $(tabDOM + '>.layui-tab-title').off('contextmenu.tab').on('contextmenu.tab', 'li', function (e) {
            var layId = $(this).attr('lay-id');
            contextMenu.show([{
                icon: 'layui-icon layui-icon-refresh',
                name: '刷新当前',
                click: function () {
                    element.tabChange(tabFilter, layId);
                    admin.refresh(layId);
                }
            }, {
                icon: 'layui-icon layui-icon-close-fill ctx-ic-lg',
                name: '关闭当前',
                click: function () {
                    admin.closeThisTabs(layId);
                }
            }, {
                icon: 'layui-icon layui-icon-unlink',
                name: '关闭其他',
                click: function () {
                    admin.closeOtherTabs(layId);
                }
            }, {
                icon: 'layui-icon layui-icon-close ctx-ic-lg',
                name: '关闭全部',
                click: function () {
                    admin.closeAllTabs();
                }
            }], e.clientX, e.clientY);
            return false;
        });
    }

    exports('index', index);
});
