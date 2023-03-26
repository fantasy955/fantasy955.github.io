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
                    <button :class="active && selected ? 'operation-active' : 'operation-default'"
                        @click="() => selected && addOperation()">
                        {{ '添加识别目标' }}
                    </button>
                </div>
                <table style="justify-self: center;">
                    <thead>
                        <tr>
                            <th>识别名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="target in targetList" :key="target.id">
                            <td>
                                <input @input="(event) => { target.name = event.target.value }" :value="target.name">
                            </td>
                            <td>
                                <button class="del" @click="remove(target.id)">移除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <InputModal ref="modal" title="请输入项目名称" @input="handleInput" />
    </div>
</template>

<script>
import { nextTick } from 'vue';
import CommonConfigurer from './components/CommonConfigurer';
import { debounce } from '@/utils/common';
import axios from 'axios';
import InputModal from './components/InputModal.vue';

export default {
    name: 'LcdConfigurer',
    mixins: [
        CommonConfigurer
    ],
    components: [
        InputModal
    ],
    data() {
        return {
            active: false,
            loading: false,
            ratio: 0,
            targetList: [],
            dirty: false,
            selected: false,
        }
    },
    mounted() {
        this.canvasContext = this.$refs.canvas.getContext('2d');
        this.clickEvent = null;
        this.$refs.canvas.addEventListener('click', (e) => {
            if (this.clickEvent) {
                this.clickEvent(e);
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
        this.clickEvent = null;
        this.moveEvent = null;
    },
    methods: {
        onSourceChange(e, sid) {
            let img = new Image();
            img.src = '/assets/shzn/1.jpg';
            this.loading = true;
            img.onload = () => {
                this.loading = false;
                while (this.targetList.length) {
                    this.targetList.shift();
                }
                nextTick(() => {
                    this.$refs.canvas.width = img.width;
                    this.$refs.canvas.height = img.height;
                    this.canvasContext.drawImage(img, 0, 0);
                    this.updateCanvasRatio();
                    this.load(sid);
                });
                this.selected = true;
            };
            this.img = img;
            this.sid = sid;
        },
        updateCanvasRatio: debounce(function () {
            // console.log(this.$refs.canvas);
            const clientWidth = this.$refs.canvas.clientWidth;
            const imageWidth = this.$refs.canvas.width;
            this.ratio = imageWidth / clientWidth;
            this.$refs.container.style.height = `${this.$refs.canvas.clientHeight + 50}px`;
        }, 200),
        addOperation() {
            if (this.active) {
                this.active = false;
                this.clickEvent = null;
                this.moveEvent = null;
                return;
            }
            this.active = true;
            let sX, sY, sRatio, eX, eY, eRatio;
            let active;
            const genMoveEvent = () => {
                return (e) => {
                    // console.log('move')
                    if (active) {
                        if (eX !== undefined && eY !== undefined) {
                            this.clear();
                        }
                        const { x, y } = this.getEventPositionOffset(e, this.$refs.canvas, true);
                        [eX, eY] = [x, y];
                        eRatio = this.ratio
                        this.draw(sX, sY, sRatio, eX, eY, eRatio);
                    }
                }
            }

            this.clickEvent = (e) => {
                const { x, y } = this.getEventPositionOffset(e, this.$refs.canvas, true);
                // console.log(x, y);
                if (!active) {
                    [sX, sY] = [x, y];
                    sRatio = this.ratio;
                    active = true;
                    this.moveEvent = genMoveEvent();
                } else {
                    active = false;
                    // console.log('put');
                    this.moveEvent = null;
                    this.$refs.modal.showModal();
                    // console.log(this.$refs.modal)
                    this.inputCallback = (name) => {
                        this.targetList.push({ name, sX, sY, sRatio, eX, eY, eRatio, id: this.uuid() });
                    };
                }
            };
        },
        clear() {
            this.canvasContext.drawImage(this.img, 0, 0);
            for (let target of this.targetList) {
                let { sX, sY, sRatio, eX, eY, eRatio } = target;
                this.draw(sX, sY, sRatio, eX, eY, eRatio);
            }
        },
        draw(sX, sY, sRatio, eX, eY, eRatio) {
            this.canvasContext.beginPath();
            this.canvasContext.trokeStyle = 'red';
            this.canvasContext.fillStyle = "rgba(0,0,0,0)";
            this.canvasContext.clientWidth = 2;
            this.canvasContext.strokeRect(sX * sRatio, sY * sRatio,
                (eX - sX) * eRatio, (eY - sY) * eRatio);
            this.canvasContext.fillRect(sX * sRatio, sY * sRatio,
                (eX - sX) * eRatio, (eY - sY) * eRatio);
            this.canvasContext.closePath();
            // this.targetList.push({ sX, sY, sRatio, eX, eY, eRatio });
        },
        load() {

        },
        save() {
            let url = '';
            axios.post(url, {
                id: this.sid,
                targets: JSON.stringify(this.targetList),
            });
        },
        remove(id) {
            if (this.$delete) {
                this.$delete(this.targetList, this.targetList.findIndex((item) => item.id === id))
            } else {
                this.targetList.splice(this.targetList.findIndex((item) => item.id === id), 1);
            }
            this.clear();
        },
        async getInput() {

        },
        handleInput(status, name) {
            console.log(name);
            if (status) {
                this.inputCallback(name.length ? name : '未命名');
            }
            this.$refs.modal.close();
            this.clear();
        },
    }
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
    width: 5.2rem;
}

input {
    width: 5rem;
    font-size: 0.8rem;
    text-align: center;
}

button.del {
    color: red;
}
</style>