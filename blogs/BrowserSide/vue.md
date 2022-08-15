[TOC]

# 代理模式

> 定义：当不方便直接访问一个对象或者不满足需要的时候，提供一个对象来控制堆这个对象的访问。

代理模式分为很多类，常用的有：保护模式、虚拟代理、缓存代理。
下面以虚拟代理实现图片预加载为例，理解代理模式的特点。

图片预加载：当请求图片较大时，首先使用一张 loading 占位，通过异步的方式加载图片资源，等到图片资源加载完成后，再替换 loading 占位图片链接。

实现代码

```javascript
// 图片展示类
class ImgShower {
	constructor(src){
		this.init(src);
	}
	// 创建图片结点
	init(src){
		console.log("创建结点")
		this.imgNode = new Image();
		document.body.appendChild(this.imgNode);
		this.imgNode.src = src;
	}
	// 设置图片链接
	setSrc(src){
		this.imgNode.src = src;
	}
}

// 图片代理类
class proxyImg {
	constructor(src,img){
		this.proxyImg = new Image();
		this.proxyImg.src = src;
		//页面加载完成后，改变图片链接
		this.proxyImg.onload = ()=>{
			this.setSrc(img)
		}
	}
	setSrc(img){	
		setTimeout(()=>img.setSrc(this.proxyImg.src),1000);//模拟1秒后才加载完成图片
	}
}
			
let img = new ImgShower('./imgs/fish.png');
let proxyImgs = new proxyImg('./imgs/car.jpg',img);

```

![image-20220815163549362](assets/image-20220815163549362.png)

通过`Object.definePropety()`方法，实现对数据的更新监听：

```javascript
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

```

![image-20220815161824603](assets/image-20220815161824603.png)

数据代理显示：

![image-20220815163834361](assets/image-20220815163834361.png)

`响应式`：为了实现在数据修改时修改页面，vue还需要做其他操作，见[响应式原理](#响应式原理)；

[(70条消息) Object.definePropety() 方法详解_魂断楼兰的博客-CSDN博客_object.defined](https://blog.csdn.net/ziwutong88/article/details/82894903)

# 生命周期

[生命周期选项 | Vue.js (vuejs.org)](https://cn.vuejs.org/api/options-lifecycle.html)

![img](assets/lifecycle.16e4c08e.png)

# 响应式原理

![在这里插入图片描述](assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d1eXhpbnU=,size_16,color_FFFFFF,t_70.png)

> Vue 最独特的特性之一，是其非侵入性的响应式系统。数据模型仅仅是普通的 JavaScript 对象。而当你修改它们时，视图会进行更新。这使得状态管理非常简单直接，不过理解其工作原理同样重要，这样你可以避开一些常见的问题。在这个章节，我们将研究一下 Vue 响应式系统的底层的细节。

Vue的数据双向绑定，响应式原理，其实就是通过Object.defineProperty()结合发布者订阅者模式来实现的。

```javascript
const obj = {
  message:'hhhh',
  name: 'why',
}

Object.keys(obj).forEach(key => {
  let value = obj[key];

  Object.defineProperty(obj, key, {
    set(newValue){
      console.log('监听' + key + '改变 ')
      value = newValue;
    },
    get(){
      console.log('获取' + key + '对应的值')
      return value
    }
  })
})

```

**Object.defineProperty()监听对象属性的改变**
**发布者订阅者模式通知需要改变的地方**

Vue 的响应式原理是核心是通过 ES5 的保护对象的 `Object.defindeProperty `中的访问器属性中的 `get `和 `set` 方法，data 中声明的属性都被添加了访问器属性，当读取 data 中的数据时自动调用 get 方法，当修改 data 中的数据时，自动调用 set 方法，检测到数据的变化，会通知观察者 Wacher，观察者 Wacher自动触发重新render 当前组件（子组件不会重新渲染）,生成新的虚拟 DOM 树，Vue 框架会遍历并对比新虚拟 DOM 树和旧虚拟 DOM 树中每个节点的差别，并记录下来，最后，加载操作，将所有记录的不同点，局部修改到真实 DOM 树上。

![在这里插入图片描述](assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d1eXhpbnU=,size_16,color_FFFFFF,t_70-16605532777875.png)

```javascript
//发布者
class Dep {
    constructor () {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }
    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }
    /* 通知所有Watcher对象更新视图 */
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

//订阅者
class Watcher {
  constructor(name) {
  	this.name = name
  }
  update() {
    // 获得新值
   console.log(this.name + '发生update');
  }
}

const dep = new Dep();

const w1 = new Watcher('张三');
dep.addSub(w1)

const w2 = new Watcher('李四);
dep.addSub(w2)

const w3 = new Watcher('王五');
dep.addSub(w3)

dep.notify()

```

![在这里插入图片描述](assets/20191216165032130.png)

![在这里插入图片描述](assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d1eXhpbnU=,size_16,color_FFFFFF,t_70-166055336910510.png)

在 Observer阶段，会为每个 key 都创建一个 dep 实例。并且，如果该 key 被某个 watcher 实例 get, **把该 watcher 实例加入 dep 实例的队列里**。如果该 key 被 set, 则通知该 key 对应的 dep 实例， 然后 dep 实例会将依次通知队列里的 watcher 实例, 让它们去执行自身的回调方法

**dep 实例是收集该 key 所有 watcher 实例的地方.**

watcher 实例用来监听某个 key ，如果该 key 产生变化，便会执行 watcher 实例自身的回调
![在这里插入图片描述](assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d1eXhpbnU=,size_16,color_FFFFFF,t_70-166055339066613.png)

[(70条消息) Vue响应式原理_wuyxinu的博客-CSDN博客_vue响应式原理](https://blog.csdn.net/wuyxinu/article/details/103565014/)
