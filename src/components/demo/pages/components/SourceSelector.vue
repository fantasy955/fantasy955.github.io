<template>
    <div>
        <h5 style="display: inline-block; margin-right: 8px;">选择视频源</h5>
        <input @change="$emit('onSourceChange', $event, $event.target.value)" :disabled="disabled" placeholder="输入视频流路径" />
        <input type="file" id="input-image" style="display: none;" accept="image/png, image/jpeg"
            @input="$emit('onFileChange', $event.target.files[0])">
        <label for="input-image"><span style="padding: 3px; cursor: pointer">选择图片</span></label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SourceSelector',
    props: ['disabled'],
    data() {
        return {
            sourceList: [],
        }
    },
    mounted() {
        // 获取所有摄像头列表
        this.sourceList = [
            { id: 0, name: 'a', desc: '' },
            { id: 1, name: 'b', desc: '' },
            { id: 2, name: 'c', desc: '' },
            { id: 3, name: 'd', desc: '' },
        ]
    },
    emits: ['onSourceChange', 'onFileChange']
}
</script>

<style scoped></style>