<template>
    <div>
        <div style="display: flex; align-items: center;">
            <SourceSelector @onSourceChange="onSourceChange" @onFileChange="onFileChange" :disabled="loading">
                <button @click="save">保存配置</button>
            </SourceSelector>
        </div>
        <div style="width: 100%; display: flex;" ref="container">
            <div style="position: relative; flex: 3; max-width: 70%; overflow: hidden;">
                <canvas v-show="!loading" ref="canvas"
                    style="user-select: none; width: 100%; -webkit-user-select: none; position: absolute; left: 0; top: 0"></canvas>
                <Loading message="加载中" v-show="loading"></Loading>
            </div>
            <div style="flex: 2; row-gap: 0.5rem;">
                <div style="display: flex;">
                    <button v-for="operation in operations" :key="operation.id"
                        :class="selected && activeOperation && operation.id === activeOperation.id ? 'operation-active' : 'operation-default'"
                        @click="() => selected && addOperation(operation)">
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
                        <tr>
                            <td colspan="3">
                                <hr />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">最小值</td>
                            <td colspan="2">
                                <input :value="this.start" @input="($event) => { start = $event.target.value }"
                                    type="number" step="0.1">
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">最大值</td>
                            <td colspan="2">
                                <input :value="this.end" @input="($event) => { end = $event.target.value }" type="number"
                                    step="0.1">
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">正常范围</td>
                            <td colspan="2">
                                <input :value="this.min" @input="($event) => { min = $event.target.value }"
                                    style="width: 4rem;" type="number" step="0.1">
                                ~
                                <input :value="this.max" @input="($event) => { max = $event.target.value }"
                                    style="width: 4rem;" type="number" step="0.1">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from '@/utils/common';
import { nextTick } from 'vue';
import CommonConfigurer from './components/CommonConfigurer';
import axios from 'axios';

export default {
    name: 'PointerCOnfigurer',
    mixins: [
        CommonConfigurer
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
            selected: false,
            dirty: false,
            min: -1,
            max: -1,
            start: 0,
            end: 0,
            operations: [
                {
                    id: 0, name: '中心', eventHandler: (e) => {
                        // console.log(this.getRealPosition);
                        const { x, y } = this.getRealPosition(e);
                        // console.log(x, y);
                        this.draw(0, x, y);
                    }
                },
                {
                    id: 1, name: '起始刻度', eventHandler: (e) => {
                        const { x, y } = this.getRealPosition(e);
                        this.draw(1, x, y);
                    }
                },
                {
                    id: 2, name: '最大刻度', eventHandler: (e) => {
                        const { x, y } = this.getRealPosition(e);
                        this.draw(2, x, y);
                    }
                },
            ],
        }
    },
    mounted() {
        this.canvasContext = this.$refs.canvas.getContext('2d');
        this.canvasEvent = null;
        this.canvasScale = 1;
        this.$refs.canvas.addEventListener('click', (e) => {
            if (this.canvasEvent) {
                this.canvasEvent(e);
            }
        });

        this.$refs.canvas.addEventListener('mousedown', (e) => {
            if (!this.canvasEvent) {
                // 没有注册绘图事件，支持拖动
                // 注册拖动的鼠标移动事件
                let [start_x, start_y] = [e.clientX, e.clientY];
                let [base_x, base_y] = [parseInt(this.$refs.canvas.style.left), parseInt(this.$refs.canvas.style.top)]
                this.moveEvent = (e) => {
                    let [x, y] = [e.clientX, e.clientY];
                    let [left, top] = [base_x + (x - start_x), base_y + (y - start_y)];
                    this.$refs.canvas.style.left = `${left}px`;
                    this.$refs.canvas.style.top = `${top}px`;
                };
            }
        });
        this.$refs.canvas.addEventListener('mouseup', (e) => {
            if (!this.canvasEvent) {
                this.moveEvent = null;
            }
        });

        this.$refs.canvas.addEventListener('wheel', (e) => {
            if (!this.canvasEvent) {
                e.preventDefault();
                this.canvasScale += e.deltaY * -0.001;
                // Restrict scale
                this.canvasScale = Math.min(Math.max(.125, this.canvasScale), 100);
                // Apply scale transform
                this.$refs.canvas.style.transform = `scale(${this.canvasScale})`;
                this.lt_x = this.center_x - (this.canvasWrapWidth * this.canvasScale / 2);
                this.lt_y = this.center_y - (this.canvasWrapWidth * this.canvasScale / 2);
            } else {
                alert('请取消标注功能后再执行缩放');
            }
        });
        this.moveEvent = null;
        this.$refs.canvas.addEventListener('mousemove', (e) => {
            if (this.moveEvent) {
                this.moveEvent(e);
            }
        });

        this.observer = new ResizeObserver((entries) => {
            this.updateCanvasRatio();
        });
        this.observer.observe(this.$refs.canvas);
    },
    unmounted() {
        this.observer.disconnect();
        this.canvasEvent = null;
    },
    methods: {
        initCanvas() {
            this.$refs.canvas.style.left = '0px';
            this.$refs.canvas.style.top = '0px';
            this.$refs.canvas.style.transform = `scale(1)`;
            this.canvasScale = 1;
        },
        // 根据摄像头id 获取目标设备图像
        // 读取已有配置，并显示
        onSourceChange: debounce(function (e, sid) {
            this.initCanvas();
            let img = new Image();
            img.src = '/assets/shzn/0.png';
            this.loading = true;
            if (this.selected) {
                this.canvasContext.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            }
            img.onload = () => {
                this.loading = false;
                this.$refs.canvas.width = img.width;
                this.$refs.canvas.height = img.height;
                // 先是参考自己的本身画布大小进行绘制，绘制完毕，由style指定的大小，渲染在浏览器页面
                // 画布的实际大小不会改变，始终是图片大小，改变的是渲染大小
                this.canvasContext.drawImage(img, 0, 0);
                this.load(sid);
                this.updateCanvasRatio();
                this.selected = true;
            };
            img.onerror = () => {
                this.loading = false;
            }
            this.img = img;
            this.sid = sid;
            for (let _id of Object.keys(this.lastState)) {
                this.lastState[_id].active = false;
                this.lastState[_id].position.x = 0;
                this.lastState[_id].position.y = 0;
            }
        }, 100),
        onFileChange(file) {
            if (!file) {
                return;
            }
            this.initCanvas();
            const img = new Image();
            img.src = URL.createObjectURL(file);
            if (this.selected) {
                this.canvasContext.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            }
            img.onload = () => {
                this.$refs.canvas.width = img.width;
                this.$refs.canvas.height = img.height;
                // 先是参考自己的本身画布大小进行绘制，绘制完毕，由style指定的大小，渲染在浏览器页面
                this.canvasContext.drawImage(img, 0, 0);
                this.updateCanvasRatio();
                this.selected = true;
            }
            this.img = img;
            for (let _id of Object.keys(this.lastState)) {
                this.lastState[_id].active = false;
                this.lastState[_id].position.x = 0;
                this.lastState[_id].position.y = 0;
            }
        },
        getRealPosition(e) {
            let [x, y] = [e.clientX * window.devicePixelRatio, e.clientY * window.devicePixelRatio];
            const rect = this.$refs.canvas.getBoundingClientRect(); // 获取 Canvas 元素在视口中的位置和尺寸
            let [left, top] = [rect.left, rect.top];
            [x, y] = [(x - left) / this.canvasScale, (y - top) / this.canvasScale];

            return { x, y };
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
        save: function () {
            // 将lastState数据保存到数据库
            let url = 'http://127.0.0.1:5000/post/pointer/config';
            let data = {
                sid: this.id,
                center_x: parseInt(this.lastState[0].position.x * this.lastState[0].ratio),
                center_y: parseInt(this.lastState[0].position.y * this.lastState[0].ratio),
                start_x: parseInt(this.lastState[1].position.x * this.lastState[1].ratio),
                start_y: parseInt(this.lastState[1].position.y * this.lastState[1].ratio),
                end_x: parseInt(this.lastState[2].position.x * this.lastState[2].ratio),
                end_y: parseInt(this.lastState[2].position.y * this.lastState[2].ratio),
                start: parseFloat(this.start),
                end: parseFloat(this.end),
                min: parseFloat(this.min),
                max: parseFloat(this.max),
            }
            console.log(JSON.stringify(data));
            axios.post(url, data)
                .then(() => { })
                .catch(() => { });
        },
        load: function (sid) {
            // 从数据库加载位置信息并调用draw方法绘制
            // 如果没有已存在的配置则不进行绘制
        },
        saveBackground: function () {
            console.log('save')
            this.bgCtx.drawImage(this.$refs.canvas, 0, 0);
        },
        draw: function (oid, x, y) {
            // console.log(oid, x, y);
            this.dirty = true;
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
            this.canvasContext.arc(x * this.ratio, y * this.ratio, this.canvasContext.lineWidth = 2 * Math.ceil(this.img.width / 500 / this.canvasScale), 0, 2 * Math.PI);
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
    text-align: center;
}
</style>