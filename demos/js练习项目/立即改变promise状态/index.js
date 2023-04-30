let task = new Promise((resolve)=>{
    resolve();
});
console.log(task);
task.then(()=>{
    console.log('then')
})
// then 创建的是微任务，因此一定是在事件循环中执行
let pool = [task];
(async function(){
    await Promise.all(pool);
    console.log('llf');
})()

console.log('end')

// 两个微任务，根据添加时间，前一个先执行