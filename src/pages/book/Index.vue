<template>
    <div class="cantainer">
        <Item v-for="book in filterdBooks" :key="book.file" :post="book.post" :title="book.title" :file="book.file"
            :desc="book.desc"></Item>
        <vue-particles class="particle" color="#dedede" :particleOpacity="0.7" :particlesNumber="160" shapeType="circle"
            :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
            :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
            clickMode="push">
        </vue-particles>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Item from "@/components/book/item.vue"
import BookList from './book.list';

const filterdBooks = computed(() => {
    return BookList.filter((book) => book.file)
});

</script>

<style scoped>
.cantainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.particle {
    position: absolute;
    inset: 0;
    z-index: -999;
}
</style>