# 语法

[代码分割 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)

```
import {lazy} from 'react'
```

**使用之前：**

```
import OtherComponent from './OtherComponent';
```

**使用之后：**

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

然后应在 `Suspense` 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。

```
mport React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

## 避免兜底avoiding-fallbacks

任何组件都可能因渲染而暂停，甚至是已经展示给用户的组件。为了使屏幕内容始终一致，如果一个已经显示的组件暂停，React 必须隐藏它的树，直到最近的 `<Suspense>` 边界。然而，从用户的角度来看，这可能会使人很困惑。

简而言之：某些情况下不展示fallback而是展示切换前组件更好。（避免闪烁：元素DOM->loading->新DOM）

参考这个标签切换的示例：

```
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');
  
  function handleTabSelect(tab) {
    setTab(tab);
  };

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}
```

在这个示例中，如果标签从 `'photos'` 切换为 `'comments'`，但 `Comments` 会暂停，用户会看到屏幕闪烁。这符合常理，因为用户不想看到 `'photos'`，而 `Comments` 组件还没有准备好渲染其内容，而 React 为了保证用户体验的一致性，只能显示上面的 `Glimmer`，别无选择。

然而，有时这种用户体验并不可取。特别是在准备新 UI 时，展示 “旧” 的 UI 会体验更好。你可以尝试使用新的 [`startTransition`](https://zh-hans.reactjs.org/docs/react-api.html#starttransition) API 来让 React 实现这一点：

```
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```

此处代码会告知 React，将标签切换为 `'comments'` **不会标记为紧急更新**，而是标记为需要一些准备时间的 [transition](https://zh-hans.reactjs.org/docs/react-api.html#transitions)。然后 React 会保留旧的 UI 并进行交互，当它准备好时，会切换为 `<Comments />`，具体请参阅 [Transitions](https://zh-hans.reactjs.org/docs/react-api.html#transitions) 以了解更多相关信息。

### 