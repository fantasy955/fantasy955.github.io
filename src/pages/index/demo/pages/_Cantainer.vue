<template>
    <div class="cantainer">
        <ul>
            <slot> </slot>
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
    display: flex;
    column-gap: 36px;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: left;
}

.cantainer>>>.demo-link {
    display: block;
    text-align: left;
}
</style>