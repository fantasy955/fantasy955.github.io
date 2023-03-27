console.log('start')
setTimeout(() => {
    console.log('time 1');
    setTimeout(() => {
        console.log('time 1 1')
    }, 0);
    Promise.resolve().then(() => {
        console.log('promise 2')
    })
}, 0);
Promise.resolve().then(() => {
    console.log('promise 1')
})
setTimeout(() => {
    console.log('time 2')
}, 0);