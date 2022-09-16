<template>
    <button @click="$emit('showMsg', 'hello world')">点我给父组件传值</button>
    <button @click="$emit('showMsg', '')">清空消息</button>
</template>

<script setup>
    import {defineEmits} from 'vue'
const emit = defineEmits(['showMsg'])

</script>

<script>
    export default {
        name: 'child'
    }
</script>

<style>

</style>