nodejs内置模块指的是除默认提供的语法之外，提供的内容，无需下载，直接引入，引入只写名称即可。

nodejs内置模块：

**1、path模块**

用于处理文件路径。

path.normalize(路径解析，得到规范路径)；

path.join(路径合并)；

path.resolve（获取绝对路径）；

path.relative(获取相对路径)。

......

**2、until模块**

弥补js功能不足，新增API。

util.format(格式化输出字符串);

util.isArray(检查是否为数组);

util.RegExp(是不是正则);

util.isDate(是不是日期型);

util.inherits(child,parent)实现继承；

**3、fs模块**

文件操作系统的API

fs.readFile(filename,[options],callback); 读取文件。

fs.writeFile(filename,data,[options],callback);写文件。

fs.appendFile(filename,data,[options],callback);以追加的方式写文件。

fs.open(filename,flags,[mode],callback); 打开文件。

filename:文件名，必须。

data：写入的数据或者buffer流。

flags:操作标识，打开方式，r w。

[options]：指定权限，读、写、执行。是否可续写。

callback：读取文件后的回调函数。function（err，data）;

fs.mkdir(path,[mode],callback);创建目录。

fs.readdir(path,callback);读取目录。

fs.exists(path,callback);查看文件与目录是否存在。

fs.utimes(path,atime,mtime,callback);修改文件的访问时间和修改时间。

fs.rename(oldfilename,newfilename,callback);重命名文件名或者目录。

fs.rmdir(path,callback);删除空目录。

path：被创建目录的完整路径以及目录名。

[mode]: 目录权限，默认0777（可读可写可执行）。

atime:新的访问时间。

ctime：新的修改时间。

oldfilename、newfilename 旧名字和新名字。

callback：创建完目录后的回调函数。

**4、events模块**

events 模块只提供了一个对象: events.EventEmitter。

【EventEmitter 的核心就是事件触发与事件监听器功能的封装。】

EventEmitter 的每个事件由一个事件名和若干个参 数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作 为回调函数参数传递。

**5、http模块**

http.createServer(function(){});创建服务器。

http.get('路径',callback);发送get请求。

http.request(options,callback);发送请求。

options：options是一个类似关联数组的对象，表示请求的参数，callback作为回调函数，需要传递一个参数。

options常用的参数有host、port（默认为80）、method（默认为GET）、path（请求的相对于根的路径，默认是“/”。

get：

```
var` `http=require(``"http"``);`` ``var` `options={``  ``hostname:``"cn.bing.com"``,``  ``port:80``}`` ` `var` `req=http.request(options,``function``(res){``  ``res.setEncoding(``"utf-8"``);``  ``res.on(``"data"``,``function``(chunk){``    ``console.log(chunk.toString())``  ``});``  ``console.log(res.statusCode);``});``req.on(``"error"``,``function``(err){``  ``console.log(err.message);``});``req.end();
```

post

```
var` `http=require(``"http"``);``var` `querystring=require(``"querystring"``);`` ` `var` `postData=querystring.stringify({``  ``"content"``:``"我真的只是测试一下"``,``  ``"mid"``:8837``});`` ` `var` `options={``  ``hostname:``"www.imooc.com"``,``  ``port:80,``  ``path:``"/course/document"``,``  ``method:``"POST"``,``  ``headers:{``    ``"Accept"``:``"application/json, text/JavaScript, */*; q=0.01"``,``    ``"Accept-Encoding"``:``"gzip, deflate"``,``    ``"Accept-Language"``:``"zh-CN,zh;q=0.8"``,``    ``"Connection"``:``"keep-alive"``,``    ``"Content-Length"``:postData.length,``    ``"Content-Type"``:``"application/x-www-form-urlencoded; charset=UTF-8"``,``    ``"Cookie"``:``"imooc_uuid=6cc9e8d5-424a-4861-9f7d-9cbcfbe4c6ae; imooc_isnew_ct=1460873157; loginstate=1;``     ``apsid=IzZDJiMGU0OTMyNTE0ZGFhZDAzZDNhZTAyZDg2ZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA``     ``AAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjkyOTk0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA``     ``AAAAAAAAAAAAAAAAAAAAAAAAAAAAAGNmNmFhMmVhMTYwNzRmMjczNjdmZWUyNDg1ZTZkMGM1BwhXVwcIV1c%3DMD;``     ``phpSESSID=thh4bfrl1t7qre9tr56m32tbv0; ``     ``Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1467635471,1467653719,1467654690,1467654957;``      ``Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467655022; imooc_isnew=2;``      ``cvde=577a9e57ce250-34"``,``    ``"Host"``:``"www.imooc.com"``,``    ``"Origin"``:``"http://www.imooc.com"``,``    ``"Referer"``:``"http://www.imooc.com/video/8837"``,``    ``"User-Agent"``:``"Mozilla/5.0 (Windows NT 10.0; WOW64) ``    ``AppleWebKit/537.36 (Khtml, like Gecko) Chrome/53.0.2763.0 Safari/537.36"``,``    ``"X-Requested-With"``:``"XMLHttpRequest"``,``  ``}``}`` ` `var` `req=http.request(options,``function``(res){``  ``res.on(``"data"``,``function``(chunk){``    ``console.log(chunk);``  ``});``  ``res.on(``"end"``,``function``(){``    ``console.log(``"评论完毕！"``);``  ``});``  ``console.log(res.statusCode);``});`` ` `req.on(``"error"``,``function``(err){``  ``console.log(err.message);``})``req.write(postData);``req.end();
```

**6、jade模块**

jade是一款高性能、简洁易懂的模板引擎。可通过jade来编写html文件。

jade类似一个用于快速编写html的语言，其编写后的文件后缀为.jade。

**7、Express框架**

Express是一个nodejs的web开源框架，用于快速的搭建web项目。其主要集成了web的http服务器的创建、静态文本管理、服务器URL地址请求处理、get和post请求处理分发、session处理等功能。

使用方法，在cmd中打开你所想创建web项目的路径。然后输入

Express appname

即可创建一个名为appname的web项目。