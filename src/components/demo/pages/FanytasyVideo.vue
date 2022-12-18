<template>
    <div class="cantainer">
        <ul>
            <li>
                <div>
                    <a href="http://43.139.126.249:5000/" target="_blank" class="row demo-link">首页</a>
                    <div class="frame-body">
                        <iframe src="http://43.139.126.249:5000/"></iframe>
                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>

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

.frame-body {
    display: block;
    position: relative;
    overflow: hidden;
    height: 92px;
    width: 192px;
    background-image: url('./assets/loading.gif');
    background-size: contain;
}

.frame-body>iframe {
    position: absolute;
    width: 1920px;
    height: 920px;
    transform-origin: top left;
    transform: scale(0.1);
    left: 0;
    top: 0;
}
</style>