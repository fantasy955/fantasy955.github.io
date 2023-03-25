<template>
    <div>
        <div style="display: flex; align-items: center;">
            <SourceSelector @onSourceChange="onSourceChange" :disabled="loading">
                <button @click="save">保存配置</button>
            </SourceSelector>
        </div>
        <div style="width: 100%; display: flex;" ref="container">
            <div style="position: relative; flex: 3; max-width: 500px;">
                <canvas v-show="!loading" ref="canvas"
                    style="user-select: none; width: 100%; -webkit-user-select: none; position: absolute; left: 0; top: 0"></canvas>
                <Loading message="加载中" v-show="loading"></Loading>
            </div>
            <div style="flex: 2; row-gap: 0.5rem;">
                <div style="display: flex;">
                    <button v-for="operation in operations" :key="operation.id"
                        :class="activeOperation && operation.id === activeOperation.id ? 'operation-active' : 'operation-default'"
                        @click="addOperation(operation)">
                        {{ '标记' + operation.name }}
                    </button>
                </div>
                <table style="justify-self: center;">
                    <thead>
                        <tr>
                            <th style="text-align: right;">标记项目</th>
                            <th>X轴坐标</th>
                            <th>Y轴坐标</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="operation in operations" :key="operation.id" style="cellspacing: 0.25rem;">
                            <td style="text-align: right;"><label>{{ operation.name }}</label></td>
                            <td><input :value="lastState[operation.id].position.x" type="number" pattern="^[1-9]\d+"
                                    @input="this.draw(operation.id, parseInt($event.target.value), lastState[operation.id].position.y)">
                            </td>
                            <td><input :value="lastState[operation.id].position.y" type="number" pattern="^[1-9]\d+"
                                    @input="this.draw(operation.id, lastState[operation.id].position.x, parseInt($event.target.value))">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import SourceSelector from './components/SourceSelector.vue';
import Loading from './components/Loading.vue';
import { debounce } from '@/utils/common';
import { nextTick } from 'vue';

export default {
    name: 'PointerCOnfigurer',
    components: [
        SourceSelector,
        Loading,
    ],
    data() {
        return {
            ratio: 0,
            loading: false,
            activeOperation: null,
            sid: -1,
            lastState: {
                0: { position: { x: 0, y: 0 }, ratio: 0, active: false },
                1: { position: { x: 0, y: 0 }, ratio: 0, active: false },
                2: { position: { x: 0, y: 0 }, ratio: 0, active: false },
            },
            operations: [
                {
                    id: 0, name: '中心', eventHandler: (e) => {
                        const { x, y } = this.getEventPositionOffset(e, this.$refs.canvas, true);
                        this.draw(0, x, y);
                    }
                },
                {
                    id: 1, name: '起始刻度', eventHandler: (e) => {
                        const { x, y } = this.getEventPositionOffset(e, this.$refs.canvas, true);
                        this.draw(1, x, y);
                    }
                },
                {
                    id: 2, name: '最大刻度', eventHandler: (e) => {
                        const { x, y } = this.getEventPositionOffset(e, this.$refs.canvas, true);
                        this.draw(2, x, y);
                    }
                },
            ],
        }
    },
    mounted() {
        this.canvasContext = this.$refs.canvas.getContext('2d');
        this.canvasEvent = null;
        this.$refs.canvas.addEventListener('click', (e) => {
            if (this.canvasEvent) {
                this.canvasEvent(e);
            }
        });
        window.addEventListener('resize', this.updateCanvasRatio);
        // this.updateCanvasRatio = this.updateCanvasRatio.bind(this);
    },
    methods: {
        // 根据摄像头id 获取目标设备图像
        // 读取已有配置，并显示
        onSourceChange: function (e, sid) {
            let img = new Image();
            img.src = '/assets/shzn/0.png';
            this.loading = true;
            img.onload = () => {
                this.loading = false;
                nextTick(() => {
                    this.$refs.canvas.width = img.width;
                    this.$refs.canvas.height = img.height;
                    // 先是参考自己的本身画布大小进行绘制，绘制完毕，由style指定的大小，渲染在浏览器页面
                    // 画布的实际大小不会改变，始终是图片大小，改变的是渲染大小
                    this.canvasContext.drawImage(img, 0, 0);
                    this.updateCanvasRatio();
                });

            };
            this.img = img;
            this.sid = sid;
            for (let _id of Object.keys(this.lastState)) {
                this.lastState[_id].active = false;
                this.lastState[_id].position.x = 0;
                this.lastState[_id].position.y = 0;
            }
        },
        // 不能使用箭头函数（需要通过apply调用）
        updateCanvasRatio: debounce(function () {
            // console.log(this.$refs.canvas)
            // console.log(this);
            const clientWidth = this.$refs.canvas.clientWidth;  // 这个是客户端渲染的大小
            const imageWidth = this.$refs.canvas.width;  // 这个属性不变
            this.ratio = imageWidth / clientWidth;
            this.$refs.container.style.height = `${this.$refs.canvas.clientHeight + 50}px`;
            // console.log(this.ratio, imageWidth, clientWidth);
        }, 200),
        addOperation: function (operation) {
            if (this.activeOperation === operation) {
                this.canvasEvent = null;
                this.activeOperation = null;
                return;
            }
            this.canvasEvent = operation.eventHandler;
            this.activeOperation = operation;
        },
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
        save: function () {

        },
        load: function (sid) {

        },
        saveBackground: function () {
            console.log('save')
            this.bgCtx.drawImage(this.$refs.canvas, 0, 0);
        },
        draw: function (oid, x, y) {
            // console.log(oid, x, y);
            this.clear(oid);
            this.addArc(x, y);
            this.lastState[oid].position.x = x;
            this.lastState[oid].position.y = y;
            this.lastState[oid].active = true;
            this.lastState[oid].ratio = this.ratio;
        },
        addArc: function (x, y) {
            this.canvasContext.fillStyle = 'red';
            this.canvasContext.beginPath();
            this.canvasContext.arc(x * this.ratio, y * this.ratio, 1, 0, 2 * Math.PI);
            this.canvasContext.fill();
        },
        clear: function (oid) {
            this.canvasContext.drawImage(this.img, 0, 0);
            for (let _id of Object.keys(this.lastState)) {
                const state = this.lastState[_id];
                if (_id != oid && state.active) {
                    this.addArc(state.position.x, state.position.y);
                }
            }
        }
    },
}
</script>

<style scoped>
button {
    cursor: pointer;
    margin: 0.25rem !important;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    user-select: none;
    -webkit-user-select: none;
}

.operation-default {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

.operation-active {
    color: #fff;
    background-color: #0b5ed7;
    border-color: #0a58ca;
    box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
}

th,
td {
    /* border: 1px solid #bbb; */
    /* padding: 2px 8px 0; */
    text-align: center;
}

input {
    width: 5rem;
    font-size: 0.8rem;
}
</style>