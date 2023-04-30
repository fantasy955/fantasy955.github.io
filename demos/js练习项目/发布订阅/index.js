class Emitter {
    constructor() {
        this.eventMap = new Map();
    }

    on(name, handler) {
        if (!this.eventMap.has(name)) {
            this.eventMap.set(name, []);
        }
        this.eventMap.get(name).push(handler);
    }

    // 支持传入数据
    emit(name, data) {
        let handlers = this.eventMap.get(name);
        for (const handler of handlers) {
            handler(data);
        }
    }

    off(name, handler) {
        let handlers = this.eventMap.get(name);
        let index = handlers.indexOf(handler);
        if (index >= 0) {
            handlers.splice(index, 1);
        }
    }

    // once只执行一次
}