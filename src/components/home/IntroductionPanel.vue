<template>
    <div class="main">
        <introduction />
        <div></div>
        <introduction1 />
    </div>
</template>

<script setup>
import introduction from './introduction.md';
import introduction1 from './introduction1.md'
</script>

<style scoped>
.main {
    display: grid;
    grid-template: 
    "a" auto
    "x" 0
    "b" auto;
    border-radius: 12px;
    padding: 12px;
}

.main * {
    background: none;
}

@media(min-width: 768px){
    .main {
        display: grid;
        grid-template: 
        /* a b 后指定的是行高 */
        "a x b" auto  / max-content 3rem max-content;
        /* / 后指定列宽，因为列只需要定义一次，行高每行可以不一样 */
    }
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