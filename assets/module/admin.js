/**  spa v3.0.7 data:2019-01-17 */

layui.define(['layer', 'config', 'layRouter'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var config = layui.config;
    var layRouter = layui.layRouter;
    var bodyDOM = '.layui-layout-admin>.layui-body';
    var tabDOM = bodyDOM + '>.layui-tab';
    var sideDOM = '.layui-layout-admin>.layui-side>.layui-side-scroll';
    var headerDOM = '.layui-layout-admin>.layui-header';
    var tabFilter = 'admin-pagetabs';
    var navFilter = 'admin-side-nav';

    var admin = {
        // 设置侧栏折叠
        flexible: function (expand) {
            var isExapnd = $('.layui-layout-admin').hasClass('admin-nav-mini');
            if (isExapnd == !expand) {
                return;
            }
            if (expand) {
                $('.layui-layout-admin').removeClass('admin-nav-mini');
            } else {
                $('.layui-layout-admin').addClass('admin-nav-mini');
            }
            admin.removeNavHover();
            onAdminReSize();
        },
        // 设置导航栏选中
        activeNav: function (url) {
            if (!url) {
                url = location.hash;
            }
            if (url && url != '') {
                var $a = $(sideDOM + '>.layui-nav a[href="#' + url + '"]');
                if ($a && $a.length > 0) {
                    $(sideDOM + '>.layui-nav .layui-nav-item .layui-nav-child dd').removeClass('layui-this');
                    $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-this');
                    $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-nav-itemed');
                    $a.parent().addClass('layui-this');  // 选中当前
                    $a.parent('dd').parents('.layui-nav-child').parent().addClass('layui-nav-itemed');  // 展开所有父级
                    // 适配多系统模式
                    $('ul[lay-filter="' + navFilter + '"]').addClass('layui-hide');
                    var $aUl = $a.parents('.layui-nav');
                    $aUl.removeClass('layui-hide');
                    $(headerDOM + '>.layui-nav>.layui-nav-item').removeClass('layui-this');
                    $(headerDOM + '>.layui-nav>.layui-nav-item>a[nav-bind="' + $aUl.attr('nav-id') + '"]').parent().addClass('layui-this');
                } else {
                    console.warn(url + ' is not in left side');
                }
            } else {
                console.warn('active url not be null');
            }
        },
        // 右侧弹出
        popupRight: function (param) {
            var eCallBack = param.end;
            if (param.title == undefined) {
                param.title = false;
                param.closeBtn = false;
            }
            if (param.anim == undefined) {
                param.anim = 2;
            }
            if (param.fixed == undefined) {
                param.fixed = true;
            }
            param.isOutAnim = false;
            param.offset = 'r';
            param.shadeClose = true;
            param.area = '336px';
            param.skin = 'layui-layer-adminRight';
            param.move = false;
            param.end = function () {
                layer.closeAll('tips');
                eCallBack ? eCallBack : '';
            };
            return admin.open(param);
        },
        // 封装layer.open
        open: function (param) {
            if (!param.area) {
                param.area = (param.type == 2) ? ['360px', '300px'] : '360px';
            }
            if (!param.skin) {
                param.skin = 'layui-layer-admin';
            }
            if (!param.offset) {
                param.offset = '100px';
            }
            if (param.fixed == undefined) {
                param.fixed = false;
            }
            param.resize = param.resize != undefined ? param.resize : false;
            param.shade = param.shade != undefined ? param.shade : .1;
            if (param.url) {
                param.type = 1;
                var sCallBack = param.success;
                param.success = function (layero, index) {
                    admin.showLoading(layero);
                    sCallBack ? sCallBack(layero, index) : '';
                    $(layero).children('.layui-layer-content').load(param.url, function () {
                        admin.removeLoading(layero);
                    });
                };
            }
            return layer.open(param);
        },
        // 封装ajax请求，返回数据类型为json
        req: function (url, data, success, method) {
            if ('put' == method.toLowerCase()) {
                method = 'POST';
                data._method = 'PUT';
            } else if ('delete' == method.toLowerCase()) {
                method = 'POST';
                data._method = 'DELETE';
            }
            admin.ajax({
                url: config.base_server + url,
                data: data,
                type: method,
                dataType: 'json',
                success: success
            });
        },
        // 封装ajax请求
        ajax: function (param) {
            var successCallback = param.success;
            param.success = function (result, status, xhr) {
                // 判断登录过期和没有权限
                var jsonRs;
                if ('json' == param.dataType.toLowerCase()) {
                    jsonRs = result;
                } else {
                    jsonRs = admin.parseJSON(result);
                }
                if (jsonRs && config.ajaxSuccessBefore(jsonRs) == false) {
                    return;
                }
                successCallback(result, status, xhr);
            };
            param.error = function (xhr) {
                param.success({code: xhr.status, msg: xhr.statusText});
            };
            param.beforeSend = function (xhr) {
                var token = config.getToken();
                if (token) {
                    xhr.setRequestHeader('Authorization', token.access_token);
                } else {
                    return false;
                }
            };
            $.ajax(param);
        },
        // 判断是否有权限
        hasPerm: function (auth) {
            var auths = config.getUserAuths();
            if (auths) {
                for (var i = 0; i < auths.length; i++) {
                    if (auth == auths[i]) {
                        return true;
                    }
                }
            }
            return false;
        },
        // 判断是否为json
        parseJSON: function (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return obj;
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        },
        // 显示加载动画
        showLoading: function (elem) {
            if (!elem) {
                elem = 'body';
            }
            $(elem).addClass('page-no-scroll');
            $(elem).append('<div class="page-loading"><div class="rubik-loader"></div></div>');
        },
        // 移除加载动画
        removeLoading: function (elem) {
            if (!elem) {
                elem = 'body';
            }
            $(elem).children('.page-loading').remove();
            $(elem).removeClass('page-no-scroll');
        },
        // 缓存临时数据
        putTempData: function (key, value) {
            if (value != undefined && value != null) {
                layui.sessionData('tempData', {key: key, value: value});
            } else {
                layui.sessionData('tempData', {key: key, remove: true});
            }
        },
        // 获取缓存临时数据
        getTempData: function (key) {
            return layui.sessionData('tempData')[key];
        },
        // 滑动选项卡
        rollPage: function (d) {
            var $tabTitle = $(tabDOM + '>.layui-tab-title');
            var left = $tabTitle.scrollLeft();
            if ('left' === d) {
                $tabTitle.animate({'scrollLeft': left - 120}, 100);
            } else if ('auto' === d) {
                var autoLeft = 0;
                $tabTitle.children("li").each(function () {
                    if ($(this).hasClass('layui-this')) {
                        return false;
                    } else {
                        autoLeft += $(this).outerWidth();
                    }
                });
                $tabTitle.animate({'scrollLeft': autoLeft - 120}, 100);
            } else {
                $tabTitle.animate({'scrollLeft': left + 120}, 100);
            }
        },
        // 刷新当前tab
        refresh: function (url) {
            layRouter.refresh(url);
        },
        // 关闭当前选项卡
        closeThisTabs: function (url) {
            admin.closeTabOperNav();
            var $title = $(tabDOM + '>.layui-tab-title');
            if (!url) {
                if ($title.find('li').first().hasClass('layui-this')) {
                    layer.msg('主页不能关闭', {icon: 2});
                    return;
                }
                $title.find('li.layui-this').find(".layui-tab-close").trigger("click");
            } else {
                if (url == $title.find('li').first().attr('lay-id')) {
                    layer.msg('主页不能关闭', {icon: 2});
                    return;
                }
                $title.find('li[lay-id="' + url + '"]').find(".layui-tab-close").trigger("click");
            }
        },
        // 关闭其他选项卡
        closeOtherTabs: function (url) {
            if (!url) {
                $(tabDOM + '>.layui-tab-title li:gt(0):not(.layui-this)').find('.layui-tab-close').trigger('click');
            } else {
                $(tabDOM + '>.layui-tab-title li:gt(0)').each(function () {
                    if (url != $(this).attr('lay-id')) {
                        $(this).find('.layui-tab-close').trigger('click');
                    }
                });
            }
            admin.closeTabOperNav();
        },
        // 关闭所有选项卡
        closeAllTabs: function () {
            $(tabDOM + '>.layui-tab-title li:gt(0)').find('.layui-tab-close').trigger('click');
            $(tabDOM + '>.layui-tab-title li:eq(0)').trigger('click');
            admin.closeTabOperNav();
        },
        // 关闭选项卡操作菜单
        closeTabOperNav: function () {
            $('.layui-icon-down .layui-nav .layui-nav-child').removeClass('layui-show');
        },
        // 设置主题
        changeTheme: function (theme) {
            if (theme) {
                layui.data(config.tableName, {key: 'theme', value: theme});
                if ('admin' == theme) {
                    theme = undefined;
                }
            } else {
                layui.data(config.tableName, {key: 'theme', remove: true});
            }
            admin.removeTheme(top);
            !theme || top.layui.link(admin.getThemeDir() + theme + '.css', theme);
            var ifs = top.window.frames;
            for (var i = 0; i < ifs.length; i++) {
                var tif = ifs[i];
                try {
                    admin.removeTheme(tif);
                } catch (e) {
                }
                if (theme && tif.layui) {
                    tif.layui.link(admin.getThemeDir() + theme + '.css', theme);
                }
            }
        },
        // 移除主题
        removeTheme: function (w) {
            if (!w) {
                w = window;
            }
            if (w.layui) {
                var themeId = 'layuicss-theme';
                w.layui.jquery('link[id^="' + themeId + '"]').remove();
            }
        },
        // 获取主题目录
        getThemeDir: function () {
            return layui.cache.base + 'theme/';
        },
        // 关闭所在的弹窗
        closeDialog: function (elem) {
            var id = $(elem).parents('.layui-layer').attr('id').substring(11);
            layer.close(id);
        },
        // 获取浏览器高度
        getPageHeight: function () {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        // 获取浏览器宽度
        getPageWidth: function () {
            return document.documentElement.clientWidth || document.body.clientWidth;
        },
        // 关闭导航菜单折叠悬浮效果
        removeNavHover: function () {
            $('.admin-nav-hover>.layui-nav-child').css({
                'top': 'auto',
                'max-height': 'none',
                'overflow': 'auto'
            });
            $('.admin-nav-hover').removeClass('admin-nav-hover');
        },
        // 自动计算导航菜单悬浮的样式
        setNavHoverCss: function ($that) {
            var $nav = $('.admin-nav-hover>.layui-nav-child');
            if ($that && $nav.length > 0) {
                var isOver = ($that.offset().top + $nav.outerHeight()) > window.innerHeight;  // 是否溢出屏幕
                if (isOver) {
                    var newTop = $that.offset().top - $nav.outerHeight() + $that.outerHeight();
                    if (newTop < 50) {
                        var pageHeight = admin.getPageHeight();
                        if ($that.offset().top < pageHeight / 2) {
                            $nav.css({
                                'top': '50px',
                                'max-height': pageHeight - 50 + 'px',
                                'overflow': 'auto'
                            });
                        } else {
                            $nav.css({
                                'top': $that.offset().top,
                                'max-height': pageHeight - $that.offset().top,
                                'overflow': 'auto'
                            });
                        }
                    } else {
                        $nav.css('top', newTop);
                    }
                } else {
                    $nav.css('top', $that.offset().top);
                }
                isHover = true;
            }
        }
    };

    // ewAdmin提供的事件
    admin.events = {
        // 折叠侧导航
        flexible: function (e) {
            var expand = $('.layui-layout-admin').hasClass('admin-nav-mini');
            admin.flexible(expand);
        },
        // 刷新主体部分
        refresh: function () {
            admin.refresh();
        },
        //后退
        back: function () {
            history.back();
        },
        // 设置主题
        theme: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({url: url ? url : 'components/tpl/theme.html'});
        },
        // 打开便签
        note: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                id: 'layer-note',
                url: url ? url : 'components/tpl/note.html'
            });
        },
        // 打开消息
        message: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({url: url ? url : 'components/tpl/message.html'});
        },
        // 全屏
        fullScreen: function (e) {
            var ac = 'layui-icon-screen-full', ic = 'layui-icon-screen-restore';
            var ti = $(this).find('i');

            var isFullscreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
            if (isFullscreen) {
                var efs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
                if (efs) {
                    efs.call(document);
                } else if (window.ActiveXObject) {
                    var ws = new ActiveXObject('WScript.Shell');
                    ws && ws.SendKeys('{F11}');
                }
                ti.addClass(ac).removeClass(ic);
            } else {
                var el = document.documentElement;
                var rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
                if (rfs) {
                    rfs.call(el);
                } else if (window.ActiveXObject) {
                    var ws = new ActiveXObject('WScript.Shell');
                    ws && ws.SendKeys('{F11}');
                }
                ti.addClass(ic).removeClass(ac);
            }
        },
        // 左滑动tab
        leftPage: function () {
            admin.rollPage("left");
        },
        // 右滑动tab
        rightPage: function () {
            admin.rollPage();
        },
        // 关闭当前选项卡
        closeThisTabs: function () {
            admin.closeThisTabs();
        },
        // 关闭其他选项卡
        closeOtherTabs: function () {
            admin.closeOtherTabs();
        },
        // 关闭所有选项卡
        closeAllTabs: function () {
            admin.closeAllTabs();
        },
        // 关闭当前元素所在弹窗
        closeDialog: function () {
            admin.closeDialog(this);
        }
    };

    // 所有ew-event
    $('body').on('click', '*[ew-event]', function () {
        var event = $(this).attr('ew-event');
        var te = admin.events[event];
        te && te.call(this, $(this));
    });

    // 移动设备遮罩层点击事件
    $('.site-mobile-shade').click(function () {
        admin.flexible(true);
    });

    // 侧导航折叠状态下鼠标经过显示提示
    var isHover = false;
    $('body').on('mouseenter', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        if (admin.getPageWidth() > 750) {
            var $that = $(this);
            $('.admin-nav-hover>.layui-nav-child').css('top', 'auto');
            $('.admin-nav-hover').removeClass('admin-nav-hover');
            $that.parent().addClass('admin-nav-hover');
            var $nav = $('.admin-nav-hover>.layui-nav-child');
            if ($nav.length > 0) {
                admin.setNavHoverCss($that);
            } else {
                var tipText = $that.find('cite').text();
                var bgColor = $('.layui-layout-admin .layui-side').css('background-color');
                bgColor = (bgColor == 'rgb(255, 255, 255)' ? '#009688' : bgColor);
                layer.tips(tipText, $that, {tips: [2, bgColor], time: -1});
            }
        }
    }).on('mouseleave', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        layer.closeAll('tips');
    });

    // 鼠标离开侧导航关闭折叠浮窗
    $('body').on('mouseleave', '.layui-layout-admin.admin-nav-mini .layui-side', function () {
        isHover = false;
        setTimeout(function () {
            if (!isHover) {
                admin.removeNavHover();
            }
        }, 500);
    });

    $('body').on('mouseenter', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item.admin-nav-hover .layui-nav-child', function () {
        isHover = true;
    });

    // 侧导航折叠状态下点击展开
    /*$('body').on('click', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        if (admin.getPageWidth() > 750) {
            layer.closeAll('tips');
            $('li.layui-nav-itemed').removeClass('layui-nav-itemed');
            $(this).parent().addClass('layui-nav-itemed');
            admin.flexible(true);
        }
    });*/

    // 所有lay-tips处理
    $('body').on('mouseenter', '*[lay-tips]', function () {
        var tipText = $(this).attr('lay-tips');
        var dt = $(this).attr('lay-direction');
        var bgColor = $(this).attr('lay-bg');
        layer.tips(tipText, this, {tips: [dt || 3, bgColor || '#333333'], time: -1});
    }).on('mouseleave', '*[lay-tips]', function () {
        layer.closeAll('tips');
    });

    // 折叠侧导航触发window.resize
    var isResize = true;
    var onAdminReSize = function () {
        isResize = false;
        setTimeout(function () {
            isResize = false;
            $(window).resize();
            setTimeout(function () {
                isResize = true;
            }, 100);
        }, 500);
    };

    // 解决从手机屏幕跟电脑屏幕切换表格宽度自适应
    $(window).on('resize', function () {
        /* && $('.layui-table-view').length > 0*/
        if (isResize) {
            setTimeout(function () {
                isResize = false;
                $(window).resize();
                setTimeout(function () {
                    isResize = true;
                }, 100);
            }, 500);
        }
    });

    // 加载缓存的主题
    var theme = layui.data(config.tableName).theme;
    if (theme) {
        (theme == 'admin') || layui.link(admin.getThemeDir() + theme + '.css', theme);
    } else if ('admin' != config.defaultTheme) {
        layui.link(admin.getThemeDir() + config.defaultTheme + '.css', config.defaultTheme);
    }

    exports('admin', admin);
});
