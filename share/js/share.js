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
        this.qApiSrc = {
            lower: "http://3gimg.qq.com/html5/js/qb.js",
            higher: "http://jsapi.qq.com/get?api=app.share"
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
        // 根据浏览器类型选择不同的分享方式
        this.share();
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
            self.os = {
                iphone: typeof _KHFWAP.os.iphone != "undefined" ? _KHFWAP.os.iphone : false,
                android: typeof _KHFWAP.os.android != "undefined" ? _KHFWAP.os.android : false
            };
            self.browser = {
                isWeixin: false,
                isQQBrowser: false,
                qqVersion: "higher",
                isUCBrowser: false
            };
            alert("test");
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
                    if(self.os.android) {
                        if(version >= 5.3) {
                            self.browser.isQQBrowser = true;
                            if(version < 5.4) {
                                self.browser.qqVersion = "lower";
                            }
                        }
                    }
                    if(self.os.iphone && version >= 5.4) {
                        self.browser.isQQBrowser = true;
                    }
                    if(self.browser.isQQBrowser) {
                        self.loadQQApi();
                    }
                    return;
                }
                if(typeof _KHFWAP.browser.ucbrowser != "undefined") {
                    // UC浏览器
                    if(self.os.android && version >= 9.7) {
                        self.browser.isUCBrowser = true;
                    }
                    if(self.os.iphone && version >= 10.2) {
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
                html += '<li class="share-item">' +
                            '<a class="'+ appList[i] +'" href="javascript:;" target="_blank" title="'+ self.appListTitle[appList[i]] +'">' +
                                self.appListTitle[appList[i]] +
                            '</a>' +
                        '</li>';
            }
            self.box.html(html).appendTo($("body")).hide();
        },
        /**
         *  根据浏览器类型选择不同的分享方式
         *  @param  void
         *  @return void
         */
        share: function() {
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
            /*var param = [];
            for(var i in shareConfig) {
                param.push(i + "=" + encodeURIComponent(shareConfig[i] || ""));
            }*/
            var param = self.encodeURI(shareConfig);
            self.box.on("click", "a", function(event) {
                var target = event.target;
                // if(target.tagName.toLowerCase() === "a") {
                    var flag = target.className;
                    switch(flag) {
                        case "qq": 
                            window.open("http://connect.qq.com/widget/shareqq/index.html?" + param.join("&"));
                            break;
                        case "qzone":
                            window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + param.join("&"));
                            break;
                        case "weibo":
                            // window.open("http://service.weibo.com/share/share.php?" + param.join("&"));
                            window.open("http://service.weibo.com/share/share.php?url=" + encodeURIComponent(shareConfig.url) + "&title=" + encodeURIComponent(shareConfig.summary) + "&pic=" + encodeURIComponent(shareConfig.pics));
                            break;
                        default: break;
                    }
                // }
            });
        },
        /**
         *  在手机UC、QQ浏览器内，利用以上浏览器的原生分享接口调用浏览器原生分享功能
         *  @param  {[object]}  变量名 变量描述
         *  @return void
         */
        shareByNative: function() {
            var self = this;
            var ucAppList = {
                weibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
                wechat: ['kWeixin', 'WechatFriends', 1, '微信好友'],
                moments: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
                qq: ['kQQ', 'QQ', '4', 'QQ好友'],
                qzone: ['kQZone', 'QZone', '3', 'QQ空间']
            };
            var from = "金海马商城-返利商城";
            self.box.on("click", "a", function(event) {
                var target = event.target;
                var flag = target.className;
                var to_app = flag;
                var link;               
                if(self.browser.isUCBrowser) {
                    // UC浏览器
                    to_app = (self.os.iphone ? ucAppList[to_app][0] : ucAppList[to_app][1]);
                    if(to_app == "QZone") {
                        // 安卓手机中点击QQ空间分享
                        try {
                            B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+self.config.imgUrl+"&title="+self.config.title+"&description="+self.config.desc+"&url="+self.config.link+"&app_name="+from;
                            k = document.createElement("div");
                            k.style.visibility = "hidden";
                            k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>';
                            document.body.appendChild(k);
                            setTimeout(function () {
                                k && k.parentNode && k.parentNode.removeChild(k);
                            }, 5E3);
                            return;
                        } catch(error) {
                            alert(error.message);
                        }
                    }
                    if (typeof(ucweb) != "undefined") {
                        ucweb.startRequest("shell.page_share", [self.config.title, self.config.desc, self.config.link, to_app, "", "@" + from, ""]);
                    } else if (typeof(ucbrowser) != "undefined") {
                        ucbrowser.web_share(self.config.title, self.config.desc, self.config.link, to_app, "", "@" + from, '');
                    }
                } else if(self.browser.isQQBrowser) {
                    // QQ浏览器
                    to_app = ucAppList[to_app][2];
                    var ah = {
                        url: self.config.link,
                        title: self.config.title,
                        description: self.config.desc,
                        img_url: self.config.imgUrl,
                        img_title: "",
                        to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                        cus_txt: "请输入此时此刻想要分享的内容"
                    };
                    ah = to_app == '' ? '' : ah;
                    if (typeof(browser) != "undefined") {
                        if (typeof(browser.app) != "undefined" && self.browser.qqVersion == "higher") {
                            browser.app.share(ah);
                        }
                    } else {
                        if (typeof(window.qb) != "undefined" && self.browser.qqVersion == "lower") {
                            window.qb.share(ah);
                        } else {
                        }
                    }
                }
            });
        },
        /**
         *  转换对象为uri参数
         *  @param  {[object]}  变量名 变量描述
         *  @return void
         */
        encodeURI: function(shareConfig) {
            var param = [];
            for(var i in shareConfig) {
                param.push(i + "=" + encodeURIComponent(shareConfig[i] || ""));
            }
            return param;
        },
        loadQQApi: function() {
            var version = this.browser.qqVersion === "lower" ? this.qApiSrc.lower : this.qApiSrc.higher;
            $("body").append('<script src="'+ version +'"></script>');
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
                // alert(JSON.stringify(res)); 
                alert("分享成功");
            },
            cancel: function(res) {
                // 针对微信：取消分享后执行的回调函数
                // alert(JSON.stringify(res));
                alert("分享失败");
            }
        }, typeof weixinConfig !== "undefined" && weixinConfig); 
    });