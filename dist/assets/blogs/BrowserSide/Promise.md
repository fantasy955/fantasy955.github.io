# 应用

[前端基础进阶（十五）：透彻掌握Promise的使用，读这篇就够了 - 简书 (jianshu.com)](https://www.jianshu.com/p/fe5f173276bd)

Promise执行完成后必须return或者执行resolve和reject返回，否则会一直pending，不会执行then方法。

# resolve与 reject，catch

[(70条消息) Promise初步详解（resolve，reject，catch）__夜渐凉的博客-CSDN博客_promise reject](https://blog.csdn.net/weixin_41888813/article/details/82882375?spm=1001.2101.3001.6650.1&depth_1-utm_relevant_index=2)

调用reject方法后，Promise状态变为rejected，即操作失败状态，此时执行then方法里面onrejected操作

```javascript
var p = new Promise(function (resolve, reject) {
	var timer = setTimeout(function () {
		console.log('执行操作1');
		resolve('这是数据1');
	}, 1000);
});
p.then(function (data) {
	console.log(data);
	console.log('这是成功操作');
});
```

输出

```
执行操作1
这是数据1
这是成功操作
```

resolve函数接收的数据作为回调函数`then`的参数。

```javascript
var p = new Promise(function (resolve, reject) {
	var flag = false;
	if (flag) {
		resolve('这是数据2');
	} else {
		reject('这是数据2');
	}
});
p.then(function (data) {//状态为fulfilled时执行
	console.log(data);
	console.log('这是成功操作');
}, function (reason) { //状态为rejected时执行
	console.log(reason);
	console.log('这是失败的操作');
});
```

输出

```
这是数据2
这是失败的操作
```

`reject`回调作为then的第二个函数参数。

## 问题

resolve和reject都是链式执行的，容易不受控制。

因此尽量使用`async`和`await`结合`promise`(尽可能规避promise)。

