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

## 递归调用问题

![image-20220816163106446](assets/image-20220816163106446.png)

**使用观察者模式**

![image-20220816163410652](assets/image-20220816163410652.png)



# 生命周期

[生命周期选项 | Vue.js (vuejs.org)](https://cn.vuejs.org/api/options-lifecycle.html)

![img](assets/lifecycle.16e4c08e.png)

**mounted**：完成模板解析，将真实DOM元素**放入页面后**（只调用一次，更新未**updated**）；

![image-20220816205545698](assets/image-20220816205545698.png)



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

## 数据劫持

将原始数据转换成代理形式，捕获对数据的修改和访问，之后再对数据进行修改。



# 事件

## 事件修饰符

`@****.prevent`;

阻止a标签的跳转；

```javascript
<a href="www.baidu.com" @click.prevent="showInfo"></a>
```

![image-20220815165514056](assets/image-20220815165514056.png)

- 冒泡

div有点击事件，div内按钮有点击事件。

对按钮添加stop，div不会触发点击事件。

事件捕获：由外往内

事件冒泡：由内往外

# 计算属性与监视属性

## 计算属性

`computed`

> **组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。**
>
> 复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的*是什么*，而非*如何*计算那个值。而且计算属性和方法使得代码可以重用。

`ps`：但vue的数据发生变化，就会重新解析模板，比对区别，更新DOM树，因此就算某个地方使用方法返回进行插值， {{function()}}，如果修改的数据影响到了方法的返回值，页面也会更新。

```javascript
export default {
  data() {
    return { a: 1 }
  },
  computed: {
    // 只读
    aDouble() {
      return this.a * 2
    },
    // 可写
    aPlus: {
      get() {
        return this.a + 1
      },
      set(v) {
        this.a = v - 1
      }
    }
  },
  created() {
    console.log(this.aDouble) // => 2
    console.log(this.aPlus) // => 2

    this.aPlus = 3
    console.log(this.a) // => 2
    console.log(this.aDouble) // => 4
  }
}
```

计算属性相比方法，计算属性会缓存，重复调用只会执行一次。

## 监视属性

```javascript
interface ComponentOptions {
  watch?: {
    [key: string]: WatchOptionItem | WatchOptionItem[]
  }
}

type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

type WatchCallback<T> = (
  value: T,
  oldValue: T,
  onCleanup: (cleanupFn: () => void) => void
) => void

type ObjectWatchOptionItem = {
  handler: WatchCallback | string
  immediate?: boolean // default: false
  deep?: boolean // default: false
  flush?: 'pre' | 'post' | 'sync' // default: 'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 4
      },
      e: 5,
      f: 6
    }
  },
  watch: {
    // 侦听根级属性
    a(val, oldVal) {
      console.log(`new: ${val}, old: ${oldVal}`)
    },
    // 字符串方法名称
    b: 'someMethod',
    // 该回调将会在被侦听的对象的属性改变时调动，无论其被嵌套多深
    c: {
      handler(val, oldVal) {
        console.log('c changed')
      },
      deep: true
    },
    // 侦听单个嵌套属性：
    'c.d': function (val, oldVal) {
      // do something
    },
    // 该回调将会在侦听开始之后立即调用
    e: {
      handler(val, oldVal) {
        console.log('e changed')
      },
      immediate: true
    },
    // 你可以传入回调数组，它们将会被逐一调用
    f: [
      'handle1',
      function handle2(val, oldVal) {
        console.log('handle2 triggered')
      },
      {
        handler: function handle3(val, oldVal) {
          console.log('handle3 triggered')
        }
        /* ... */
      }
    ]
  },
  methods: {
    someMethod() {
      console.log('b changed')
    },
    handle1() {
      console.log('handle 1 triggered')
    }
  },
  created() {
    this.a = 3 // => new: 3, old: 1
  }
}
```

**计算属性内部不能开启异步计算**，依靠返回值。

**箭头函数没有this，会往外找。**

![image-20220815183238386](assets/image-20220815183238386.png)

# 样式绑定

![image-20220815202401614](assets/image-20220815202401614.png)

# 列表渲染

```html
    <div id="main">
        <h2>人员信息遍历</h2>
        <ul>
            <li v-for="(p, index) of personList" :key="index">{{p.name}}</li>
        </ul>
    </div>

<script type="text/javascript">
    const demoComponent = {
        data(){
            return{
                personList: [
                    {name: '张三', age: 12, id: '001'},
                    {name: '李四', age: 22, id: '002'}
                ]
            }
        }
    }
    const demoApp = Vue.createApp(demoComponent);
    demoApp.mount('#main');

</script>
```

## key

### 原理

默认是index

### 虚拟DOM的对比算法

![image-20220816153029685](assets/image-20220816153029685.png)

0，1，2原地更新，3添加。

依靠**id**对比更新。一致的复用，不一致的重新创建真实DOM。

如果打乱了原始列表的顺序，就不能使用index作为key。

![image-20220816153610385](assets/image-20220816153610385.png)

## 列表更新

- 数组内对象不能直接替换，vue不会检测到。

### Vue监听普通对象数据改变

![image-20220816162324862](assets/image-20220816162324862.png)

加工data见[响应式原理](#响应式原理)；`Object.defineProperty()`;

简单模拟数据检测：

![image-20220816163531647](assets/image-20220816163531647.png)

### Vue监听数组内对象改变

Vue只检测数组7个修改自身的方法，不能使用`arr[x] = new_val`。
`split`：修改；`unshift`：头部插入



# 表单收集

![image-20220816174018777](assets/image-20220816174018777.png)

# 过滤器

![image-20220816185501935](assets/image-20220816185501935.png)

# 内置指令

![image-20220816185702957](assets/image-20220816185702957.png)

`v-html`：以html语法渲染字符串；

`v-cloak`：在Vue加载后会清除该属性。



# 外置指令

指定相关回调函数的this都指向window

## 对象式

```javascript
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一**个包含修饰符的对象 (如果有的话)**。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

举例来说，像下面这样使用指令：

```
<div v-example:foo.bar="baz">
```

`binding` 参数会是一个这样的对象：

```javascript
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

和内置指令类似，自定义指令的参数也可以是动态的。举例来说：

```html
<div v-example:[arg]="value"></div>
```

### 简化形式

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```html
<div v-color="color"></div>
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

## 函数式

![image-20220816202739495](assets/image-20220816202739495.png)

## Vue2中

![image-20220816203929982](assets/image-20220816203929982.png)

**获取焦点：**

![image-20220825154421056](assets/image-20220825154421056.png)