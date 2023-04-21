
import SourceSelector from './SourceSelector.vue';
import Loading from './Loading.vue';

export default {
    components: [
        SourceSelector,
        Loading,
    ],
    methods: {
        getEventPositionOffset: function (event, el, absolute) {
            const { x: ex, y: ey } = this.getEventPosition(event);
            if (absolute) {
                // console.log('绝对定位', ex, ey);
                return { x: ex, y: ey };
            }
            // console.log('指针坐标', ex, ey);
            const { left, top } = this.offset(el);
            // console.log('偏移', left, top);
            const [x, y] = [ex - left, ey - top];
            return { x, y };
        },
        getEventPosition: function (ev) {
            let x, y;
            //注：使用这个函数，需要给Canvas元素的position设为absolute。
            if (ev.layerX || ev.layerX == 0) {
                x = ev.layerX;
                y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                x = ev.offsetX;
                y = ev.offsetY;
            }
            return { x: x, y: y };
        },
        offset: function (el) {
            // get the client offset of the target element
            let top = el.offsetTop
            let left = el.offsetLeft
            while (el.offsetParent) {
                el = el.offsetParent
                top += el.offsetTop
                left += el.offsetLeft
            }
            return {
                left: left,
                top: top
            }
        },
        uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }),
        deepCopy(any) {
            if (typeof any === 'object') {
                if (Array.isArray(any)) {
                    return any.map((item) => this.deepCopy(item))
                } else if (Object.prototype.toString.call(any).slice(8, -1) === 'Function') {
                    return new Function(`return ${any.toString()}`)
                } else {
                    const newObj = {}
                    for (const key in any) {
                        newObj[key] = this.deepCopy(any[key])
                    }
                    return newObj;
                }
            }
            return any
        }
    }
}