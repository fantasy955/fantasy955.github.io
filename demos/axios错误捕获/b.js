
class B {
    setPromise(fn) {
        this.task = fn();
    }

    doIt() {
        this.task.then((r) => {
            console.log('resolve', r)
        }).catch((r) => {
            console.log('reject', r)
        })
    }
}




module.exports = {
    B
}