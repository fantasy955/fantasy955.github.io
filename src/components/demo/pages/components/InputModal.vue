<template>
    <div class="mask" v-show="show">
        <form>
            <label for="input">{{ title + ':' }}</label>
            <input type="text" id="input" name="input" ref="input" required>
            <div class="btn-group">
                <button @click="(e) => onCancel(e)">取消</button>
                <button @click="(e) => onSubmit(e)">确认</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'InputModal',
    props: [
        'title',
    ],
    emits: [
        'input'
    ],
    data() {
        return {
            show: false,
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            this.$emit('input', true, this.$refs.input.value.trim());
            this.close();
        },
        onCancel(e) {
            e.preventDefault();
            this.$emit('input', false, '');
            this.close();
        },
        showModal() {
            this.show = true;
        },
        close() {
            this.$refs.input.value = '';
            this.show = false;
        }
    }
}

</script>

<style scoped>
.mask {
    position: fixed;
    inset: 0;
    background-color: rgba(18, 17, 17, 0.8);
    z-index: 999;
}

form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

label {
    display: block;
    margin-bottom: 10px;
}

input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
}

button {
    display: inline-block;
    margin: 0 auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}

.btn-group {
    display: flex;
    justify-content: space-between;
}

.title {}
</style>