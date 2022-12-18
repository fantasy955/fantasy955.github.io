<template>
    <div class="cantainer">
        <ul>
            <li>
                <div>
                    <a href="http://43.139.126.249:5000/" target="_blank" class="row demo-link">首页</a>
                    <PagePreview target="http://43.139.126.249:5000/"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import PagePreview from './components/PagePreview.vue'
</script>

<style scoped>
.cantainer {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    height: 100%;
}

.cantainer>ul {
    margin-left: 30px;
}

.demo-link {
    padding-left: 12px;
}
</style>