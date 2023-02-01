export const mixin = {
    methods: {
        showMsg(info){
            console.log(info);
        }
    },
    // 声明周期钩子不会被替代，都会执行
    mounted() {
        console.log('挂载了');
    },
}