/*
 *  抽取部分内容出来进行浏览器UA
 *  date: 2016/03/31
 */
//全局设置khf对象
window._KHFWAP = {};

/**
 *  浏览器检测函数,虽然不可完全信任,但是可以做基本的检测
 *  @pagram ua        浏览器的navigator.useAgent
 *  @pagram platform  浏览器的navigator.platform
 *
 *  editor: yansiwen
 *  date: 2016-04-05
 */
function detect(ua, platform) {
    var os = this.os = {},
        browser = this.browser = {},
        webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        osx = !!ua.match(/\(Macintosh\; Intel /),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        win = /Win\d{2}|Windows/.test(platform),
        wp = ua.match(/Windows Phone ([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/),
        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
        ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
        webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
        safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
        
        weixin = ua.match(/MicroMessenger\/([\d.]+)/); // 判断是否是微信浏览器
        ucbrowser = ua.match(/UCBrowser\/([\d.]+)/);   // 判断是否是UC浏览器
        qqbrowser = ua.match(/MQQBrowser\/([\d.]+)/);  // 判断是否是QQ浏览器

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]
    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (wp) os.wp = true, os.version = wp[1]
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (osx || os.ios || win)) {
        browser.safari = true;
        if (!os.ios) browser.version = safari[1]
    }
    if (webview) browser.webview = true;

    if (weixin) {
        browser.isWeixin = true; 
        browser.weixinVersion = weixin[1];
    }
    if (ucbrowser) {
        browser.isUC = true; 
        browser.ucVersion = ucbrowser[1];
    }
    if (qqbrowser) {
        browser.isQQ = true; 
        browser.qqVersion = qqbrowser[1];
    }

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
        (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
        (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
}
// 应用浏览器检测
detect.call(_KHFWAP, navigator.userAgent, navigator.platform);
/**
 *  使用浏览器检测结果
 *  _KHFWAP.os       return {} 
 *  _KHFWAP.browser  return {}
 */

/**
 *  全局domready方法
 *  @pagram  无
 *  @return  function
 */
;
(function() {
    var domReady = function(fn) {
        var readyRE = /complete|loaded|interactive/;
        if (readyRE.test(document.readyState) && document.body) {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", function() {
                fn();
            }, false);
        }
    }
    _KHFWAP.domReady = domReady;
}(_KHFWAP));