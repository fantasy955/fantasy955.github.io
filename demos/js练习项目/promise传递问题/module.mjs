function run(creator) {
    let task = creator();
    task.then((res) => {
        console.log(res);
    }).catch((reson) => {
        console.log(reson);
    })
}

function runPromise(task) {
    task.then((res) => {
        console.log(res);
    }).catch((reson) => {
        console.log(reson);
    })
}

export default {
    run,
    runPromise
}