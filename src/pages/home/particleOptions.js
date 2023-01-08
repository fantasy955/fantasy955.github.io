import { reactive } from "vue"

// 背景动画设置
// color: String类型。默认'#dedede'。粒子颜色。
// particleOpacity: Number类型。默认0.7。粒子透明度。
// particlesNumber: Number类型。默认80。粒子数量。
// shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
// particleSize: Number类型。默认80。单个粒子大小。
// linesColor: String类型。默认'#dedede'。线条颜色。
// linesWidth: Number类型。默认1。线条宽度。
// lineLinked: 布尔类型。默认true。连接线是否可用。
// lineOpacity: Number类型。默认0.4。线条透明度。
// linesDistance: Number类型。默认150。线条距离。
// moveSpeed: Number类型。默认3。粒子运动速度。
// hoverEffect: 布尔类型。默认true。是否有hover特效。
// hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
// clickEffect: 布尔类型。默认true。是否有click特效。
// clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。

export const options = reactive({
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push' // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: 'grab' // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#dedede'
    },
    links: {
      color: '#dedede', // '#dedede'。线条颜色。
      distance: 150, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.5, // 线条透明度。
      width: 1 // 线条宽度。
    },
    collisions: {
      enable: false
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 4, // 粒子运动速度。
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80 // 粒子数量。
    },
    opacity: {
      value: 0.5 // 粒子透明度。
    },
    shape: {
      type: 'circle' // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
  // "autoPlay": true,
  // color: "#dedede",
  // particleOpacity: "0.7",
  // particlesNumber: "160",
  // shapeType: "circle",
  // particleSize: "4",
  // linesColor: "#dedede",
  // linesWidth: "1",
  // lineLinked: "true",
  // lineOpacity: "0.4",
  // linesDistance: "150",
  // moveSpeed: "3",
  // hoverEffect: "true",
  // hoverMode: "grab",
  // clickEffect: "true",
  // clickMode: "push",
});