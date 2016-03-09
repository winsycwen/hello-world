(function(){
	var shareTitle = $("#title").text(),
		shareContent = $("#content").text(),
		sharePicLink = $(".container img").attr("src");
	var shareConfig = {
		url: location.href,
		title: shareTitle,
		summary: shareContent,
		pics: sharePicLink
	};
	var s = [];
	for(var i in shareConfig) {
		s.push(i + "=" + encodeURIComponent(shareConfig[i] || ""));
	}
	$("#J_share").on("click", function(event) {
		var flag;
		var target = event.target;
		if(target.tagName.toLowerCase() === "i") {
			flag = target.className && target.className.split("-")[1];
			switch(flag) {
				case "qq": 
					window.open("http://connect.qq.com/widget/shareqq/index.html?" + s.join("&"));
					break;
				case "qzone":
					window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join("&"));
					break;
				case "wb":
					// window.open("http://service.weibo.com/share/share.php?" + s.join("&"));
					window.open("http://service.weibo.com/share/share.php?url=" + encodeURIComponent(shareConfig.url) + "&title=" + encodeURIComponent(shareConfig.summary) + "&pic=" + encodeURIComponent(shareConfig.pics));
					break;
				default: break;
			}
		}
	});
})();
