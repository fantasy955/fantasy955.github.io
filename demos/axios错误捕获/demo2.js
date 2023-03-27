
const task1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject(1);
    }, 200)
})

task1.then((r)=>{
    console.log('resolve', r)
}).catch((r)=>{
    console.log('reject', r)
})

// task1.catch((r) => {
//     console.log('reject', r)
// })