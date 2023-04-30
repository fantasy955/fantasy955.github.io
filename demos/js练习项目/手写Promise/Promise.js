
class MyPromise {
    constructor(excutor) {
        this.status = 'pending';
        this.dirty = false;  // 状态是否被改变过
        this.onSuccessCallbacks = [];
        this.onFailedCallbacks = [];
        this.result = undefined;
        excutor(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(msg) {
        if (this.dirty) {
            return
        }
        this.dirty = true;
        this.status = 'fullfilled';
        this.result = msg;
        while (this.onFailedCallbacks.length) {
            let cb = this.onSuccessCallbacks.shift();
            cb(msg);
        }
    }
    reject(reason) {
        if (this.dirty) {
            return
        }
        this.dirty = true;
        this.status = 'reject';
        this.result = reason;
        while (this.onFailedCallbacks.length) {
            let cb = this.onFailedCallbacks.shift();
            cb(reason);
        }
    }
    then(cb1, cb2) {
        if (this.status === 'pending') {
            this.onSuccessCallbacks.push(cb1);
            if (cb2 !== undefined) {
                this.onFailedCallbacks.push(cb2);
            }
        }
        if (this.status === 'fullfilled') {
            cb1(this.result);
        }
        if (this.status === 'reject') {
            if (cb2 !== undefined) {
                cb2(this.result);
            }
        }
        return this;
    }
}

module.exports = MyPromise;