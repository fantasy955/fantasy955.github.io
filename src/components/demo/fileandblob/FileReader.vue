<template>
    <div class="d-flex w-100 justify-center flex-wrap">
        <input type="file" class="btn" @change="handleFileChange" />
        <a class="btn btn-primary" ref="download">下载</a>
        <text class="d-block w-100 p-3" ref="text"></text>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const download = ref('');
const file = ref('');
const text = ref('');
const fileReader = new FileReader;
fileReader.onload = (e) => {
    // e.target.result等价于reader.result.
    text.value.innerText = `${fileReader.result}`;
}
const handleFileChange = (e) => {
    file.value = e.target.files[0];
    if (file.value) {
        const bStr = fileReader.readAsBinaryString(file.value);
        const url = URL.createObjectURL(file.value);
        download.value.setAttribute('href', url);
        download.value['download'] = file.value.name;
        file.value.text().then((res) => {
            console.log(res);
        });
    }
}

</script>

<style scoped>

</style>