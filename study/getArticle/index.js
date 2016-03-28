var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
	getTitles(res);
}).listen(900, "127.0.0.1");

/**
 * @description:获取文章标题
 * @param	{[object]}	res	服务器响应
 * @return	void
 */
function getTitles(res) {
	fs.readFile('titles.json', function(err, data) {
		if(err) {
			hadError(err, res);
			return;
		}
		console.log("titles: ", data.toString());
		getTemplates(JSON.parse(data.toString()), res);
	});
}

/**
 * @description:获取html模板
 * @param	{[object]}	变量名	变量描述
 * @return	void
 */
function getTemplates(titles, res) {
	fs.readFile("template.html", function(err, data) {
		if(err) {
			hadError(err, res);
			return;
		}
		console.log("template: ", data.toString());
		renderHtml(titles, data.toString(), res);
	});
}

/**
 * @description:将获取到的html渲染出来
 * @param	{[object]}	变量名	变量描述
 * @return	void
 */
function renderHtml(titles, tmpl, res) {
	var html = tmpl.replace("%", titles.join('<li></li>'));
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write(html);
	res.end();
}

function hadError(err, res) {
	console.log(err);
	res.end("Server Error");
}