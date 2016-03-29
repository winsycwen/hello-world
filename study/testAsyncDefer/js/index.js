var util = {
	/**
	 * @description: 深拷贝
	 * @param	{[object]}	obj	变量
	 * @return	{[object]} newObj 深拷贝得到的对象
	 */
	deepCloneObj: function(obj) {
		var newObj = (obj instanceof Array) ? [] : {};
		if(typeof obj !== "object") return;
		
		for(var name in obj) {
			newObj[name] = (typeof obj[name] === "object") ? this.deepCloneObj(obj[name]) : obj[name];
		}
		return newObj;
	},
	/**
	 * @description:扩展一个或多个对象为一个对象
	 * @param	{[boolean]} target 是否进行深复制
	 * @param	{[object]}	obj
	 * @return	void
	 */
	extend: function(target) {
		var deep;
		if(target instanceof Boolean) {
			// 如果第一个参数为boolean类型，则表示是否进行深复制
			deep = target;
		}
	}
};
var a = {
	a: "b",
	b: [1, 2, 3],
	c: function() {
		console.log("test");
	}
};
// var a = [1, 2, 3];
var b = util.deepCloneObj(a);
console.log(a, b);
alert(a);
// 使用此方法，如果对象中存在函数，会丢失函数
var c = JSON.stringify(a);
console.log(a, JSON.parse(c));