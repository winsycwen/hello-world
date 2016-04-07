/** 
 *  自定义分享内容
 *  
 *  @author: yansiwen
 *  @date  : 2016-04-06
 */
function CustomShare(config, weixinConfig) {
    if(typeof config !== "object") {
        // console.log("第一个配置项不为对象类型");
        return;
    }
    this.triggerBtn = $(config.triggerBtn); // 触发显示自定义分享面板的按钮

    this.config = config || {};
    this.appList = config.appList || ["wechat", "moments", "qq", "qzone", "weibo"]; // 默认分享平台 
    this.appListTitle = {
        "wechat": "分享给微信好友",
        "moments": "分享到微信朋友圈",
        "qq": "分享给QQ好友",
        "qzone": "分享到QQ空间",
        "weibo": "分享到新浪微博"
    };
    // 微信JS-SDK配置参数 
    if(!!weixinConfig && typeof weixinConfig === "object") {
        this.appId = weixinConfig.appId;
        this.timestamp = weixinConfig.timestamp;
        this.nonceStr = weixinConfig.nonceStr;
        this.signature = weixinConfig.signature;
    }
    // 获取浏览器信息
    this.getPlatform();
    // 根据浏览器类型渲染不同的HTML模板
    this.init();
    // 根据浏览器类型为分享按钮绑定不同的事件
    this.bindEvent();
}

CustomShare.prototype = {
    constructor: CustomShare,
    /**
     *  获取浏览器信息：判断是否在手机端的微信/QQ/UC浏览器中打开页面
     *  Notice: 必须先检测UA是否为微信浏览器，因为在一些手机上微信的UA除了显示为micromessenger还会有MQQBrowser。
     *  @param  void    
     *  @return void
     */
    getPlatform: function() {
        var self = this;
        self.phone = false;
        self.browser = {
            isWeixin: false,
            isQQBrowser: false,
            qqVersion: "higher",
            isUCBrowser: false
        };
        var version = self.getVersion(_KHFWAP.browser.version);
        if(_KHFWAP.os.phone) {
            // 手机端
            self.phone = true;
            if(typeof _KHFWAP.browser.weixin != "undefined") {
                // 微信内置浏览器
                self.browser.isWeixin = true;
                return;
            } 
            if(typeof _KHFWAP.browser.qqbrowser != "undefined") {
                // QQ浏览器
                if(_KHFWAP.os.android) {
                    if(version >= 5.3) {
                        self.browser.isQQBrowser = true;
                        if(version < 5.4) {
                            self.browser.qqVersion = "lower";
                        }
                    }
                }
                alert("qqbrowser");
                if(_KHWAP.os.iphone && version >= 5.4) {
                    alert("iphone");
                    self.browser.isQQBrowser = true;
                }
                return;
            }
            if(typeof _KHFWAP.browser.ucbrowser != "undefined") {
                // UC浏览器
                if(_KHFWAP.os.android && version >= 9.7) {
                    self.browser.isUCBrowser = true;
                }
                if(_KHFWAP.os.iphone && version >= 10.2) {
                    self.browser.isUCBrowser = true;
                }
                return;
            }
        } 
    },
    /**
     *  获取浏览器的版本号
     *  @param  {[object]}  变量名 变量描述
     *  @return void
     */
    getVersion: function(version) {
        var arr = version.split(".");
        return parseFloat(arr[0] + "." + arr[1]);
    },
    /**
     *  根据浏览器类型渲染不同的HTML模板
     *  @param  void
     *  @return void
     */
    init: function() {
        var self = this;
        if(self.browser.isWeixin && self.phone) {
            // 如果是在微信中打开，显示提示层，不显示分享按钮
            self.renderTipsHTML();
            return;
        }
        self.renderShareHTML();
    },
    /**
     *  在手机端的微信浏览器内，渲染点击"分享"按钮后的用户提示蒙层
     *  @param  void
     *  @return void
     */
    renderTipsHTML: function() {
        var self = this,
            html = '';
        self.box = $("<div>").addClass("custom-share-layer").html("请点击右上角|分享");
        self.box.on("click", function() {
                    self.box.hide();
                })
                .appendTo($("body"))
                .hide();
    },
    /**
     *  在PC端、手机端的QQ、UC和其它浏览器（不包括微信浏览器）下，渲染分享部分的HTML
     *  @param  void
     *  @return void
     */
    renderShareHTML: function() {
        var self = this,
            html = '',
            appList = self.appList,
            len = self.appList.length;

        self.box = $("<ul>").attr({"id": "#J_customShare", "class": "custom-share-list"});
        for(var i = 0; i < len; i++) {
            // 手机端中除了QQ、UC、微信浏览器外的其它浏览器中，只显示QQ、QQ空间、微博图标
            if(!self.browser.isQQBrowser && !self.browser.isUCBrowser && (appList[i] === "wechat" || appList[i] === "moments")) {
                continue;
            }
            html += '<li class="'+ appList[i] +' share-item">' +
                        '<a class="'+ appList[i] +'" href="javascript:;" target="_blank" title="'+ self.appListTitle[appList[i]] +'">' +
                            self.appListTitle[appList[i]] +
                        '</a>' +
                    '</li>';
        }
        self.box.html(html).appendTo($("body")).hide();
    },
    /**
     *  根据浏览器类型为分享按钮绑定不同的事件
     *  例如：微信浏览器内，点击按钮只显示提示蒙层；在UC/QQ浏览器中，会调用
     *  @param  void
     *  @return void
     */
    bindEvent: function() {
        var self = this;
        self.triggerBtn.on("click", function() {
            self.box.toggle();
            if(self.browser.isWeixin) {
                // 在微信中打开，显示提示层，不显示分享按钮
                self.shareBySDK();
            } else if(self.browser.isUCBrowser || self.browser.isQQBrowser) {
                self.shareByNative();
            } else {
                self.shareByLink();
            }
        });
    },
    /**
     *  在手机微信浏览器内，使用JS-SDK自定义分享内容
     *  微信JS-SDK文档：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *  @param     void
     *  @return    void
     */
    shareBySDK: function() {
        var self = this;
        wx.config({
            debug: true,
            appId: self.appId,
            timestamp: self.timestamp,
            nonceStr: self.nonceStr,
            signature: self.signature,
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareQZone'
            ]
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage(self.config);  // 分享给微信好友
            wx.onMenuShareTimeline(self.config);    // 分享到微信朋友圈（没有分享描述）
            wx.onMenuShareQQ(self.config);          // 分享给QQ好友
            wx.onMenuShareQZone(self.config);       // 分享到QQ空间
        });
    },
    /**
     *  在PC端，手机端的非QQ、UC、微信浏览器内，使用各社交媒体的分享链接实现QQ好友、QQ空间以及新浪微博的分享功能
     *  @param    {[object]}    变量名    变量描述
     *  @return    void
     */
    shareByLink: function() {
        var self = this;
        var shareConfig = {
            url: self.config.link,
            title: self.config.title,
            summary: self.config.desc,
            pics: self.config.imgUrl
        };
        var s = [];
        for(var i in shareConfig) {
            s.push(i + "=" + encodeURIComponent(shareConfig[i] || ""));
        }
        this.box.on("click", function(event) {
            var flag;
            var target = event.target;
            if(target.tagName.toLowerCase() === "a") {
                flag = target.className;
                switch(flag) {
                    case "qq": 
                        window.open("http://connect.qq.com/widget/shareqq/index.html?" + s.join("&"));
                        break;
                    case "qzone":
                        window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join("&"));
                        break;
                    case "weibo":
                        // window.open("http://service.weibo.com/share/share.php?" + s.join("&"));
                        window.open("http://service.weibo.com/share/share.php?url=" + encodeURIComponent(shareConfig.url) + "&title=" + encodeURIComponent(shareConfig.summary) + "&pic=" + encodeURIComponent(shareConfig.pics));
                        break;
                    default: break;
                }
            }
        });
    },
    /**
     *  在手机UC、QQ浏览器内，利用以上浏览器的原生分享接口调用浏览器原生分享功能
     *  @param  {[object]}  变量名 变量描述
     *  @return void
     */
    shareByNative: function() {

    }
};

$(function() {
    // 调用分享，自定义分享内容
    var pageShare = new CustomShare({
        triggerBtn: "#J_shareBtn",
        link: location.href, 
        title: $("#J_shareTitle").text(),
        desc: $("#J_shareDesc").text(),
        imgUrl: $("#J_shareImg").attr("src"),
        appList: ["wechat", "moments", "qq", "qzone", "weibo"],
        trigger: function() {

        },
        success: function(res) {
            // 针对微信：分享成功后执行的回调函数
            alert(JSON.stringify(res));
        },
        cancel: function(res) {
            // 针对微信：取消分享后执行的回调函数
            alert(JSON.stringify(res));
        }
    }, typeof weixinConfig !== "undefined" && weixinConfig);
});