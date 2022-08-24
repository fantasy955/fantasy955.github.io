// var http = require('http');

// http.createServer((req, res) => {
//     // 接受浏览器传的参数
//     console.log('ok');
//     res.writeHead(200, {'Cotent-type': 'text/plain'});
//     res.write('end');
//     res.end("[1, 2, 3]");
// }).listen(3000, ()=>{
//     console.log('listen 3000');
// });

var o = {};//创建一个对象
//使用数据描述符来为对象添加属性
Object.defineProperty(o,'a',{
	value: 37,
	writable: true,
	enumerable: true,
	configurable: true
});
//属性a被设置到对象o上，并且值为37

//使用访问器描述符来为对象添加属性
var bValue = 38;
Object.defineProperty(o,'b',{
	get:function(){console.log('get value'); return bValue;},
	set:function(newValue){bValue = newValue; console.log('update b')},
	enumerable: true,
	configurable: true
});

