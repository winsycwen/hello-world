<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxe8417b184d322069", "5c318be8df0f4817a4e520bf08c94bb1");
$signPackage = $jssdk->GetSignPackage();
?>
<!doctype html>
<html lang="en">
<head>
    <!--页面顶部引用资源和标题-->
        <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable"><!-- 是否启用 WebApp 全屏模式 -->
    <meta name="format-detection" content="telephone=no, email=no"/><!-- 不自动识别手机号码和email -->
    <meta name="HandheldFriendly" content="true"><!-- 兼容老式浏览器,如黑莓等 -->
    <meta name="screen-orientation" content="portrait"> <!-- uc强制竖屏 -->
    <meta name="full-screen" content="yes"><!-- uc强制全屏 -->
    <meta name="browsermode" content="application"> <!-- uc应用模式 -->
    <meta name="x5-orientation" content="portrait"> <!-- QQ强制竖屏 -->
    <meta name="x5-fullscreen" content="true"><!-- QQ强制全屏 -->
    <meta name="x5-page-mode" content="app"><!-- QQ应用模式 -->

    <link href="http://static.jjcdn.com/mobile/css/base.css" type="text/css" rel="stylesheet" />
    <link href="http://static.jjcdn.com/mobile/css/rebate-share.css" type="text/css" rel="stylesheet" />

    <script>
        ;(function(){
            var clientWidth = document.documentElement.clientWidth;
            if(clientWidth > 750) { clientWidth = 750 };
            document.getElementsByTagName("html")[0].style.fontSize=clientWidth/7.5+"px";
        })();
    </script>

    <title>分享承载页</title>
</head>
<body>
<div class="page-wrap">
    <!-- 分享承载页顶部 -->
    <div class="rebate-share-header">
        <div class="rebate-top">
            <a href="http://m.kinhom.com/">
                <img src="http://static.jjcdn.com/mobile/images/login-logo.png" alt="金海马商城">
            </a>
        </div>
        <div class="rebate-banner">
            <div class="rebate-user">
                <div class="user-pic">
                    <img src="http://static.jjcdn.com/mobile/images/user-face-default.png" alt="老徐的店">
                </div>
                <p class="shop-name">老徐的店</p>
            </div>
            <div class="rebate-bg">
                <img class="lazy" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg">
            </div>
        </div>
    </div>
    <!-- 分享承载页顶部 end -->
    
    <!-- 分享承载页推荐部分 -->
    <div class="rebate-share-recommend">
        <div class="recommend-title">
            <p class="line"></p>
            <img src="http://static.jjcdn.com/mobile/images/rebate-recommend.png" alt="热推宝贝">
        </div>
        <ul class="recommend-list">
            <li class="recommend-item ovh">
                <div class="item-img">
                    <a href="http://m.kinhom.com/item/6718.html">
                        <img class="lazy" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="小户型必备 经典灰色绒布转角沙发 限2行">
                    </a>
                </div>
                <div class="item-detail">
                    <a href="http://m.kinhom.com/item/6718.html">
                        <span class="title">小户型必备 经典灰色绒布转角沙发 限2行</span>
                        <span class="price">&yen;&nbsp;13500</span>
                        <span class="rebate-price">返&nbsp;&yen;&nbsp;99</span>
                    </a>
                </div>
            </li>
            <li class="recommend-item ovh">
                <div class="item-img">
                    <a href="http://m.kinhom.com/item/6718.html">
                        <img class="lazy" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="小户型必备 经典灰色绒布转角沙发 限2行">
                    </a>
                </div>
                <div class="item-detail">
                    <a href="http://m.kinhom.com/item/6718.html">
                        <span class="title">小户型必备 经典灰色绒布转角沙发 限2行</span>
                        <span class="price">&yen;&nbsp;13500</span>
                        <span class="rebate-price">返&nbsp;&yen;&nbsp;99</span>
                    </a>
                </div>
            </li>
        </ul>
    </div>
    <!-- 分享承载页推荐部分 end -->
    
    <!-- 分享承载页筛选 -->
    <div class="rebate-share-search" id="j_rebateSearch">
        <!-- 结果提示和筛选 -->
        <div class="search-result">
            <span class="result-detail">
                <i>全部</i>：共<i>900</i>个商品
            </span>
            <a id="filter" class="btn-search j_filter">筛选</a>
        </div>
        <!-- 结果提示和筛选 end --> 

        <!-- 筛选导航 -->
        <div class="screening-nav">
            <a href="#" class="screening-item active">推荐</a>
            <a href="#" class="screening-item">人气</a>
            <a href="#" class="screening-item">价格<span class="asc"></span></a>
            <a href="#" class="screening-item">返利<span class="desc"></span></a>
        </div> 
        <!-- 筛选导航 end -->
    </div>
    <!-- 分享承载页筛选 end -->
    
    <div class="list-none failed">
        <img src="http://static.jjcdn.com/mobile/images/loading-failed.gif" alt="列表为空" />
        <p>苦苦寻找，TA还是没出现...</p>
    </div>
    <!-- 分享承载页列表 -->
    <ul class="rebate-share-list ovh">
        <li class="share-item">
            <a href="javascript:void(0);">
                <img class="lazy item-img" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行">
            </a>
            <a class="item-detail" href="javascript:void(0);">
                <span class="title">超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行</span>
                <span class="price-wrap ovh">
                    <i class="price">&yen;&nbsp;39999</i>
                </span>
            </a>
        </li>
        <li class="share-item">
            <a href="javascript:void(0);">
                <img class="lazy item-img" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行">
            </a>
            <a class="item-detail" href="javascript:void(0);">
                <span class="title">超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行</span>
                <span class="price-wrap ovh">
                    <i class="price">&yen;&nbsp;39999</i>
                </span>
            </a>
        </li>
        <li class="share-item">
            <a href="javascript:void(0);">
                <img class="lazy item-img" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行">
            </a>
            <a class="item-detail" href="javascript:void(0);">
                <span class="title">超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行</span>
                <span class="price-wrap ovh">
                    <i class="price">&yen;&nbsp;39999</i>
                </span>
            </a>
        </li>
        <li class="share-item">
            <a href="javascript:void(0);">
                <img class="lazy item-img" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行">
            </a>
            <a class="item-detail" href="javascript:void(0);">
                <span class="title">超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行</span>
                <span class="price-wrap ovh">
                    <i class="price">&yen;&nbsp;39999</i>
                </span>
            </a>
        </li>
        <li class="share-item">
            <a href="javascript:void(0);">
                <img class="lazy item-img" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行">
            </a>
            <a class="item-detail" href="javascript:void(0);">
                <span class="title">超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行</span>
                <span class="price-wrap ovh">
                    <i class="price">&yen;&nbsp;39999</i>
                </span>
            </a>
        </li>
        <li class="share-item">
            <a href="javascript:void(0);">
                <img class="lazy item-img" data-src="http://static.jjcdn.com/mobile/images/rebate-header-bg.jpg" alt="超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行">
            </a>
            <a class="item-detail" href="javascript:void(0);">
                <span class="title">超值特卖 梵尔特系列 现代简约 米白色 真皮 沙发组合 （3+贵）坐下左限两行</span>
                <span class="price-wrap ovh">
                    <i class="price">&yen;&nbsp;39999</i>
                </span>
            </a>
        </li>
    </ul>
    <div class="load-more"><span>拼命为您加载，马上奉上... </span></div>
    <!-- 分享承载页列表 end -->

    <!-- 分享按钮 -->
    <button class="rebate-share-btn" id="j_shareBtn">分享好友&nbsp;坐享返利&nbsp;&gt;</button>
    <!-- 分享按钮 end -->
    
    <!-- 筛选弹框 -->
    <div class="filter-pop hk-side-pop j_filterPop">
        <div class="content">
            <div class="title">商品分类</div>
            <ul class="hd j_tabHead">
                <li class="side-item active"><a href="#">全部<span>（8）</span></a></li>
                <li class="side-item">客厅<span>（2）</span></li>
                <li class="side-item">卧室<span>（0）</span></li>
                <li class="side-item">餐厅<span>（2）</span></li>
                <li class="side-item">书房<span>（2）</span></li>
                <li class="side-item">儿童<span>（2）</span></li>
                <li class="side-item">办公家具<span>（0）</span></li>
                <li class="side-item">家居百货<span>（0）</span></li>
            </ul>
            <div class="bd j_tabContent"></div>
        </div>
        <a href="javascript:void(0);" class="close j_filterClose">
            <span>点击此处返回</span>
        </a>
    </div>
    <!-- 筛选弹框 end -->
</div>

<script>
// 微信JSDK配置

var weixinConfig = {
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>'
}
// 分享的标题以及描述
var SHARECONFIG = {
    title: "我的金海马商城小店，购买可获返现哦~",
    desc: "我的金海马商城小店（老徐的小店），分享购买可获返利哦~家居百货买起来！",
    imgUrl: "http://static.jjcdn.com/mobile/images/rebate-share-img.png"
};
// 筛选二级类目数据
var classificData = {
    "list": [
        {   
            "classific": [
                // 一级分类为"全部"，默认不显示二级分类
            ]
        },
        {   // 一级分类除去"全部"类目，其它类目二级分类第一项为"全部"
            "classific": [
                {
                    "proTitle": "全部",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "沙发床",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "电视柜/地柜",
                    "proLink": "http://wap.kinhom.com"
                }
            ]
        },
        {
            // 一级分类类目后方显示商品数量为0，则默认为空数组
            "classific": [
            ]  
        },
        {
            "classific": [
                {
                    "proTitle": "全部",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "床",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "床垫",
                    "proLink": "http://wap.kinhom.com"
                }
            ]  
        },
        {
            "classific": [
                {
                    "proTitle": "全部",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "床",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "床垫",
                    "proLink": "http://wap.kinhom.com"
                }
            ]  
        },
        {
            "classific": [
                {
                    "proTitle": "全部",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "aaa",
                    "proLink": "http://wap.kinhom.com"
                },
                {
                    "proTitle": "床垫",
                    "proLink": "http://wap.kinhom.com"
                }
            ]  
        },
        {
            "classific": [
            ]  
        },
        {
            "classific": [
            ]  
        }
    ]
}
</script>
<!--页面底部引用资源-->

    <script src="http://static.jjcdn.com/mobile/js/base-testshare.js"></script>
    <script src="http://static.jjcdn.com/mobile/js/rebate-share.js"></script>
 <!--    <script src="http://care3.live800.com/live800/chatClient/floatButton.js?companyID=8141&configID=1425&codeType=custom"></script> -->
</body>
</html>