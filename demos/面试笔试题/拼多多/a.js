function createTimer (){
    return new Promise((resolve)=>{
        setTimeout(resolve, 3000)
    })
}

let task = new Promise(async (resolve, reject) => {
    await createTimer();
    resolve('yes')
}).then(console.log);

// let task = createTimer().then(() => 'yes').then(console.log);