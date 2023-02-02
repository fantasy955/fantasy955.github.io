<template>
    <div class="cantainer" ref="c" title="点击下载文件">
        <div class="post">
            <img :src="post ? post : '/assets/book/favo.jpg'" />
        </div>
        <div class="title">
            <span>{{ displayTitle }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref, computed } from 'vue';
import { useClickListener } from '@/hooks/useClick';

const props = defineProps({
    post: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    }
})

const c = ref(null);
const download = () => {
    if (props.file) {
        window.open(window.location.protocol + props.file);
    }
}
useClickListener(c, download);

const displayTitle = computed(() => {
    return props.title.length >= 11 ? `${props.title.slice(0, 9)}...` : props.title;
})

</script>

<!-- tailwind css 与 bootstrap样式冲突 -->
<!-- <style scoped lang="postcss">
.btn {
    @apply bg-black;
}
</style> -->

<style scoped>
.cantainer {
    width: 10rem;
    height: 15rem;
    background-color: white;
    padding: 0px;
    margin: 4px;
    cursor: pointer;
}

.post {
    width: 100%;
    height: 80%;
    user-select: none;
    -webkit-user-select: none;
}

.post img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title {
    width: 100%;
    height: 20%;
    text-align: center;
}

.title span {
    line-height: 100%;
    user-select: auto;
    -webkit-user-select: auto;
}
</style>