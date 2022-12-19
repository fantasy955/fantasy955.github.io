<template>
<!-- 模板里面必须有根元素 -->
<div>
    <School></School>
</div>
    
</template>

<script>
//es6模块化
import School from './School'  
export default {
    name: 'App',
    components: {
        School
    }
}
</script>

<style>

</style>