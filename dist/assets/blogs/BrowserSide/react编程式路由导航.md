react-router-dom 编程式路由导航 (v5)
1.push跳转+携带params参数

```
 props.history.push(`/b/child1/${id}/${title}`);
```

2.push跳转+携带search参数

```
props.history.push(`/b/child1?id=${id}&title=${title}`);
```

3.push跳转+携带state参数

```
props.history.push(`/b/child1`, { id, title });
```

4.replace跳转+携带params参数

```
this.props.history.replace(`/home/message/detail/${id}/${title}`)
```

5.replace跳转+携带search参数

```
this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)
```

6.replace跳转+携带state参数

```
this.props.history.replace(`/home/message/detail`, { id, title });
```

7.前进

```
this.props.history.goForward();
```

8.回退

```
this.props.history.goForward();
```

9.前进或回退 ( go )

```
this.props.history.go(-2); //回退到前2条的路由
```

在一般组件中使用编程式路由导航 (非路由组件)

```
import {withRouter} from 'react-router-dom'

class Header extends Component {
    // withRouter(Header)后，就可以在一般组件内部使用 this.props.history 
    //...
}

export default withRouter(Header)
```

react-router-dom 编程式路由导航 (v6)
// v6版本编程导航使用 useNavigate (以下为引入代码)

```
import {  useNavigate } from "react-router-dom";
export default function A() {
  const navigate = useNavigate();
  //...
}
```

1.push跳转+携带params参数

```
 navigate(`/b/child1/${id}/${title}`);
```

2.push跳转+携带search参数

```
navigate(`/b/child2?id=${id}&title=${title}`);
```

3.push跳转+携带state参数

```
navigate("/b/child2", { state: { id, title }});
```

4.replace跳转+携带params参数

```
navigate(`/b/child1/${id}/${title}`,{replace: true});
```

5.replace跳转+携带search参数

```
navigate(`/b/child2?id=${id}&title=${title}`,{replace: true});
```

6.replace跳转+携带state参数

```
navigate("/b/child2", { state: { id, title },replace: true});
```

为您推荐相关文章:

react-router-dom 编程式路由导航 (v6)
// v6版本编程导航使用 useNavigate (以下为引入代码)
import {  useNavigate } from "react-router-dom";
export default function A() {
  const navigate = useNavigate();
  //...
}
1
2
3
4
5
6
1.push跳转+携带params参数
 navigate(`/b/child1/${id}/${title}`);
1
2.push跳转+携带search参数
navigate(`/b/child2?id=${id}&title=${title}`);
1
3.push跳转+携带state参数
navigate("/b/child2", { state: { id, title }});
1
4.replace跳转+携带params参数
navigate(`/b/child1/${id}/${title}`,{replace: true});
1
5.replace跳转+携带search参数
navigate(`/b/child2?id=${id}&title=${title}`,{replace: true});
1
6.replace跳转+携带state参数
navigate("/b/child2", { state: { id, title },replace: true});
1
为您推荐相关文章:

深度解析 React useRef Hook 的使用 ！ https://blog.csdn.net/qq_42753705/article/details/121973014?spm=1001.2014.3001.5501
最简洁的 Mbox 6.x 基本使用步骤介绍（仅三步）！！！https://blog.csdn.net/qq_42753705/article/details/121909076?spm=1001.2014.3001.5501
(干货) 全网最全 react-router-dom v6.0学习指南（新特性深入解读、持续更新…）！！！https://blog.csdn.net/qq_42753705/article/details/121871363?spm=1001.2014.3001.5501
（原创）深入解读s React 中的useState Hook 修改了值，但是不重新渲染，不刷新的问提https://blog.csdn.net/qq_42753705/article/details/121837154?spm=1001.2014.3001.5501
在React中使用 react-router-dom 编程式路由导航的正确姿势【含V5.x、V6.x】https://blog.csdn.net/qq_42753705/article/details/122008800
React中使用 react-router-dom 路由传参的三种方式详解【含V5.x、V6.x】！！！https://blog.csdn.net/qq_42753705/article/details/121998895
————————————————
版权声明：本文为CSDN博主「普通网友」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_61083409/article/details/123220651