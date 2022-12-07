async function randomDelay(id) {
    // 延迟 0~1000 毫秒
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished: ${delay}`);
        resolve();
    }, delay));
}
async function foo() {
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    await randomDelay(4);
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

async function foo1() {
    const t0 = Date.now();
    const promises = Array(5).fill(null).map((_, i) => randomDelay(i));
    for (const p of promises) {
        await p;
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo1(); 