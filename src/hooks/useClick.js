import { ref, onMounted, onUnmounted } from 'vue';

export const useClickListener = (t, callback) => {
    onMounted(()=>{
        t.value.addEventListener('click', callback);
    });
    onUnmounted(() => {
        window.removeEventListener('click', callback);
        console.log('click 事件卸载了')
    })
}

