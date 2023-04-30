
const VirtualList = {
    template: `
    <div class="list" ref="list" @scroll="onScroll" @click="onClick">
        <div class="list-phantom" :style="{ height: totalHeight + 'px' }">
        <div
        class="list-item"
        v-for="(item, index) in visibleData"
        :key="index"
        :style="{ top: itemTop(index) + 'px' }"
        >
        {{ item }}
    </div>
        </div>
    </div>
    `,
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        itemHeight: {
            type: Number,
            default: 20,
        },
    },
    data() {
        return {
            start: 0,
            end: 0,
        };
    },
    computed: {
        visibleData() {
            return this.data.slice(this.start, this.end);
        },
        totalHeight() {
            return this.data.length * this.itemHeight;
        },
    },
    mounted() {
        this.updateVisibleData();
        console.log('totalHeight', this.totalHeight);
        // window.addEventListener('scroll', ()=>{
        //     console.log('scroll');
        //     this.onScroll();
        // });
        this.$refs.list.addEventListener('scroll', this.updateVisibleData);
    },
    methods: {
        onScroll() {
            console.log('scroll');
            this.updateVisibleData();
        },
        updateVisibleData() {
            const scrollTop = this.$refs.list.scrollTop;
            console.log('scrollTop', scrollTop);
            console.log('clientHeight', this.$refs.list.clientHeight);
            const visibleCount = Math.ceil(this.$refs.list.clientHeight / this.itemHeight);
            this.start = Math.floor(scrollTop / this.itemHeight);
            this.end = this.start + visibleCount;
            console.log('start end', this.start, this.end);
        },
        itemTop(index) {
            return (this.start + index) * this.itemHeight;
        },
        onClick() {
            console.log('click')
        }
    },
}

const App = {
    components: { VirtualList },
    data() {
        return {
            data: new Array(1000).fill(0).map((_, i) => i + 1),
        };
    },
    template: `
<div>
    <VirtualList :data='data' />
</div>
`,
}

// eslint-disable-next-line no-undef
Vue.createApp(App).mount('#app');