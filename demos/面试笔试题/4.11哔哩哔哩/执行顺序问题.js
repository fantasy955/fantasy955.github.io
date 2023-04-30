console.log(1)

async function a() {
    return new Promise((resolve, reject) => {
        resolve();
        console.log(2);
    })
}

(async function () {
    await a();
    console.log(3);
})()


setTimeout(() => {
    console.log(4);
}, 0);

new Promise(() => {
    console.log(5);
})

console.log(6);