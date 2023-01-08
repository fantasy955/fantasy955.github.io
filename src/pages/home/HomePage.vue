<template>
    <div class="cantainer">
        <Particles id="particles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" class="particle"
            :options="options" v-if="mounted" />
        <IntroductionPanel />
        <div class="friends"></div>
        <component src="./assets/js/MathJaxConfig.js" :is="'script'"></component>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { options } from './particleOptions';
import { loadFull } from "tsparticles"  // must import
import IntroductionPanel from '@/components/home/IntroductionPanel.vue';
const particlesInit = async (engine) => {
    await loadFull(engine)
}
const particlesLoaded = async (container) => {
    console.log('Particles container loaded', container)
}
const mounted = ref(false);

onMounted(()=>{
    mounted.value = true;
});

</script>

<style scoped>
.friends {
    display: flex;
    flex-wrap: wrap;
}

.friends>.friends__item {}

.cantainer {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 300px;
    padding: 12px;
    text-align: center;
}

.particle {
    position: absolute;
    inset: 0;
    z-index: -999;  
}
</style>