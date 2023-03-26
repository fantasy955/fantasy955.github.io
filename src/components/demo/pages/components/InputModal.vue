<template>
    <div class="mask">
        <!-- <div class="main">
            <header>{{ title }}</header>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'InputModal',
    props: [
        'title',
    ]
}

</script>

<style scoped>
:is(.mask) {
    position: fixed;
    inset: 0;
    background-color: rgba(18, 17, 17, 0.8);
    z-index: 999;
}

:is(body) {
    overflow: hidden;
}

/* .main {
    position: fixed;
    width: fit-content;
    left: 1rem;
    right: 1rem;
    margin-left: auto;
    margin-right: auto;
} */

.title {}
</style>