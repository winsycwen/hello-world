define(function(require, exports, module) {
	/**
	 * 表单消息提示
	 * 
	 * @date	2016-03-17 16:16:50
	 * @author	yansiwen
	 */
	var Prompt = function() {};
	Prompt.prototype = {
		init: function(opts) {
			this.opts = opts || {};
			opts.ele = opts.ele || "";
			opts.status = opts.status || "";
		},
		show: function(text, type) {
			switch(type) {
				case "error": 
					this.ele.
			}
		},
		hide: function() {

		}
	};
});