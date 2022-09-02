```javascript
const routes = [
  {
    path: '/',
    component: HomePage,
    children: [{
      path: '',
      component: HomeBlog,
    }, {
      path: 'demo',
      component: DemoContent
    }, {
      path: 'blog',
      component: HomeBlog
    }]
  }, {
    path: '/blog/:categorySname/:blogName/:path',
    name: 'blog', component: BlogPage, props: true
  }
]
```

