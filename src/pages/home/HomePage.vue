<template>
    <div class="scroll-wrap">
        <div class="scrollbar-wrap">
            <div class="cantainer">
                <IntroductionPanel />
                <div class="friends"></div>
                <component src="./assets/js/MathJaxConfig.js" :is="'script'"></component>
                <vue-particles class="particle" color="#dedede" :particleOpacity="0.7" :particlesNumber="160"
                    shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true"
                    :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab"
                    :clickEffect="true" clickMode="push">
                </vue-particles>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import IntroductionPanel from '@/components/home/IntroductionPanel.vue';

</script>

<style scoped>
.friends {
    display: flex;
    flex-wrap: wrap;
}

.scroll-wrap {
    top: 76px;
}

@media(max-width: 170px){
    .scroll-wrap {
    top: 96px;
}
}

.friends>.friends__item {}

.cantainer {
    position: relative;
    width: 100%;
    min-height: 300px;
    padding: 12px;
    text-align: center;
    overflow: hidden;
}

.particle {
    position: absolute;
    inset: 0;
    z-index: -999;
}
</style>