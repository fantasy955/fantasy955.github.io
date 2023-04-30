let originalPush = Array.prototype.push;
Array.prototype.push = function(...args){
    // 执行访问拦截操作
    // end
    return originalPush.apply(this, args);
}