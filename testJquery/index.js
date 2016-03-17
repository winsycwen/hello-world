var jQuery = function(age) {
	// return new jQuery.fn.init(age);
	return new jQuery.prototype.init(age);
};
jQuery.prototype = {
	age: 18,
	init: function(age) {
		this.age = age;
		return this;
	},
	show: function() {
		console.log("show");
		return this;
	},
	hide: function() {
		console.log("hide");
		return this;
	}
};
/*jQuery.fn = jQuery.prototype;
jQuery.fn.init.prototype = jQuery.fn;*/
jQuery.prototype.init.prototype = jQuery.prototype;
var a = jQuery(16);
var b = jQuery(19);
console.log(a);
console.log(b);
a.show();
b.show();
/*var aQuery = function(selector, context) {
       return  aQuery.prototype.init();
}
aQuery.prototype = {
    init: function() {
        this.age = 18 // 此处的this指向aQuery，并非实例对象
        return this;
    },
    name: function() {},
    age: 20
}

aQuery().age  //18*/