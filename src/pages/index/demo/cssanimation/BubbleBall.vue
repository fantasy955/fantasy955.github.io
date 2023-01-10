<template>
    <div class="cantainer">
        <div class="bubble" style="--size: 60px;"></div>
        <div class="bubble" style="--size: 150px;"></div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.cantainer {
    height: 100%;
    position: relative;
}

.bubble {
    display: inline-block;
    width: var(--size);
    height: var(--size);
    /* box-shadow: 0 0 10px black; */
    /* 默认情况下, 线性渐变的方向是从上到下，你可以指定一个值来改变渐变的方向。 */
    /* 渐变角度 */
    /* 创建实线 */
    /* 渐变中心点 */
    background: radial-gradient(blue, pink);
    vertical-align: top;
    border-radius: 50%;
    animation: bubbleUp 3s;
}

@keyframes bubbleUp {
    from {
        transform: translateY(100vh) scale(0);
    }

    to {
        transform: translateY(0)  scale(1);
    }
}
</style>