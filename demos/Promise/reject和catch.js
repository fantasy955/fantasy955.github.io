const job = new Promise((resolve, reject) => {
    // setTimeout(()=>{
    //     reject("出错了");
    // }, 300)
    const a = undefined;
    const b = a.b;
    resolve(b);
})

job.then((res)=>{
    console.log(res);
})

job.catch((error) => {
    console.log('出错了')
    console.log('msg', error);
})