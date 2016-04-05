<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxe8417b184d322069", "5c318be8df0f4817a4e520bf08c94bb1");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WAP端(移动)微信好友/微信朋友圈/QQ好友/Qzone/微博组件分享</title>
    <link rel="stylesheet" href="../../stylesheet/index.css">
    <link rel="stylesheet" href="../../stylesheet/nativeShare.css"/>
</head>
<body>
  
</body>
    <h1>测试分享</h1>
    <section class="container">
        <h1 id="title">AAAAA</h1>
        <p id="content">( •̀ ω •́ )y大王叫我来巡山啊~~~~~~~~~</p>
        <img src="http://winsycwen.github.io/hello-world/share/images/test.jpg" alt="小动物">
    </section>
    <ul id="J_share" class="list">
        <li class="qq share-item">
            <a href="javascript:;" target="_blank" title="分享到QQ">
                <i class="share-qq"></i>
            </a>
        </li>
        <li class="qzone share-item">
            <a href="javascript:;" target="_blank" title="分享到QQ空间">
                <i class="share-qzone"></i>
            </a>
        </li>
        <li class="wb share-item">
            <a href="javascript:;" target="_blank" title="分享到新浪微博">
                <i class="share-wb"></i>
            </a>
        </li>
    </ul>
    <!-- <button id="hideQQMenuItem">隐藏分享到QQ好友的菜单选项</button>
    <button id="showQQMenuItem">显示分享到QQ好友的菜单选项</button>
    <button id="hideQzoneMenuItem">隐藏分享到QQ空间的菜单选项</button>
    <button id="showQzoneMenuItem">显示分享到QQ空间的菜单选项</button> -->
    <script src="../../js/jquery.js"></script>
    <script src="../../js/jweixin-1.0.0.js"></script>
    <script>
    var weixinConfig = {
        appId: "<?php echo $signPackage["appId"];?>",
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>'
    }
    </script>
    <script src="../../js/core.js"></script>
    <script src="../../js/share.js"></script>
    <script>
        /*
        * 注意：
        * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
        * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
        * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
        *
        * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
        * 邮箱地址：weixin-open@qq.com
        * 邮件主题：【微信JS-SDK反馈】具体问题
        * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
        */
        /*wx.config({
            debug: true,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems'
            ]
        });
        wx.ready(function () {
            var shareTitle = $("#title").text(),
                shareContent = $("#content").text(),
                sharePicLink = $(".container img").attr("src");
            var shareConfig = {
                link: location.href,
                title: shareTitle,
                desc: shareContent,
                imgUrl: sharePicLink,
                success: function(res) {
                    alert(JSON.stringify(res));
                },
                cancel: function(res) {
                    alert(JSON.stringify(res));
                }
            };
            wx.onMenuShareAppMessage(shareConfig);
            wx.onMenuShareTimeline(shareConfig); // 分享到朋友圈是没有分享描述的
            wx.onMenuShareQQ(shareConfig);
            wx.onMenuShareQZone(shareConfig);

            $("#hideQzoneMenuItem").on("click", function(event) {
                wx.hideMenuItems({
                    menuList: ["menuItem:share:QZone"]
                });
            });
            $("#showQzoneMenuItem").on("click", function(event) {
                wx.showMenuItems({
                    menuList: ["menuItem:share:QZone"] // 要显示的菜单项，所有menu项见附录3
                });
            });
            $("#hideQQMenuItem").on("click", function(event) {
                wx.hideMenuItems({
                    menuList: ["menuItem:share:qq"]
                });
            });
            $("#showQQMenuItem").on("click", function(event) {
                wx.showMenuItems({
                    menuList: ["menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
                });

            });
        });*/
    </script>
</html>
