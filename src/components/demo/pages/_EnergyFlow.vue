<template>
    <div>{{ screenSize }}</div>
    <div class="canvas" id="g6node" :style="{ boxShadow: 'var(--el-box-shadow-light)' }"></div>
</template>

<script setup>
import G6 from '@antv/g6';
import { onMounted, watchEffect, ref, watch } from 'vue';
import { useScreenSize } from '@/stores/screenWidth';
import { debounce } from '@/utils/common.js';
const screenSize = useScreenSize();
var graph = undefined;
const data = {
    // 点集
    nodes: [
        {
            id: 'node1', // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
        },
        {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
        },
    ],
    // 边集
    edges: [
        {
            source: 'node1', // String，必须，起始点 id
            target: 'node2', // String，必须，目标点 id
        },
    ],
};

watch(screenSize,
    // 第三个参数onCleanup
    // 我们在主代码中写onCleanup要执行的内容：
    // onCleanup(()=>{do something});
    // 因此只有调用过watch的回调函数后，才知道onCleanup要执行的操作
    // 因此第一次不会调用
    // 而且当cleanup事件注册后，与watch回调函数无关了，cleanup内的代码会在每次监听到状态改变后执行
    // 没有防抖效果
    debounce((value, pre) => {
       graph.changeSize(screenSize.width, screenSize.height);
    }, 500)
);

onMounted(() => {
    graph = new G6.Graph({
        container: 'g6node', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: document.documentElement.clientWidth, // Number，必须，图的宽度
        height: document.documentElement.clientHeight, // Number，必须，图的高度
    });
    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图
})
</script>

<style scoped>
.canvas {
    display: flex;
    width: 100%;
    height: 100%;
    margin-left: 3px;
    margin-right: 3px;
}
</style>