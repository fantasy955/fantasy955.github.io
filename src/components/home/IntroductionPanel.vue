<template>
    <div class="main">
        <introduction />
        <!-- <vue-markdown :source="introduction"></vue-markdown> -->
        <!-- <h3>你好! 欢迎来到我的页面</h3>
        <h3 class="text-effect" data-text-content="This is Fantasy955">This is Fantasy955</h3>
        <p>Fantasy来自于周杰伦专辑<span><a src="">《范特西》</a></span>, 955来自于本人名字的26键拼音输入</p>
        <p>目前在学习前端, 掌握了HTML5, CSS3, ES6, TypeScript相关知识</p>
        <p>能够熟练使用Vue, React框架, 关注Svelte, Qwick等新兴框架</p>
        <p>Keep Studying kepp Writing</p> -->
    </div>
</template>

<script setup>
import introduction from './introduction.md';
</script>

<style scoped>
.main {
    border-radius: 12px;
    padding: 12px;
}

.main p,
h3,
h4,
h5 {
    text-align: left;
    padding-bottom: 6px;
}

.text-effect {
    position: relative;
    /* 特效颜色 */
    --effect-color: #5f10f3;
    /* 无特效时的普通文本颜色 */
    text-align: left;
    --normal-color: #2a323d;
    max-width: max-content;
    color: var(--normal-color);
}

.text-effect::before {
    content: attr(data-text-content);
    position: absolute;
    color: var(--effect-color);
    white-space: nowrap;
    overflow: hidden;
    /* width: 100%; */
    animation: text-effect 4s linear infinite;
    /* clip-path: inset(0 40%); */
    /* polygon每组是一个(width height)指定的坐标点 */
    clip-path: polygon(80% 0%, 80% 100%, 100% 100%, 100% 0%);
}


@keyframes text-effect {

    0%,
    100% {
        width: 0;
    }

    50% {
        width: 100%;
    }
}
</style>