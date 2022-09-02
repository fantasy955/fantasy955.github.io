<template>
  <div class="row">
    <div class="col-xl-2 pl-3 pr-3">
      <div class="sticky-top text-center">
        <div class="text-muted">Share this</div>
        <div class="share d-inline-block">
          <!-- AddToAny BEGIN -->
          <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
            <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
            <a class="a2a_button_facebook"></a>
            <a class="a2a_button_twitter"></a>
          </div>
          <component
            src="https://static.addtoany.com/menu/page.js"
            :is="'script'"
            async
          >
          </component>
          <!-- AddToAny END -->
        </div>
      </div>
    </div>

    <div class="col-xl-8 border order-1" role="main">
      <div id="article-body">加载中</div>
    </div>
    <div
      class="col-md-2 pl-3"
      :class="screenWidth <= smallSceenSize ? first : second"
      id="div-article-toc"
    >
      <div
        class="sticky-top mr-1 toc-scroll"
        style="top: 90px"
        id="article-toc"
      ></div>
    </div>
    <component src="./assets/js/MathJaxConfig.js" :is="'script'"></component>

  </div>
</template>

<script setup>
import axios from "axios";
import editormd from "editor.md/src/editormd";
import { defineProps, onMounted, inject, computed, ref, watch } from "vue";

const globalParams = inject('globalParams');
const editor = editormd();

const probs = defineProps({
  blogPath: {
    type: String,
    required: true,
  },
});

const smallSceenSize = globalParams.smallScreenSize;
const first = ref("order-0");
const second = ref("order-2");

var getBlogContent = axios.get(probs.blogPath);

var screenWidth = document.body.clientWidth;
screenWidth = ref(screenWidth);

onMounted(() => {
  getBlogContent.then((res) => {
    {
      let mdcontent = res.data;
      let el = document.getElementById("article-body");

      let tmp = probs.blogPath.split("/");
      let dirName = tmp[tmp.length - 1 - 1];
      mdcontent = mdcontent.replace(
        /\]\(assets/g,
        "](./assets/blogs/" + dirName + "/assets"
      );

      el.innerHTML = "";
      mdcontent = mdcontent.trim().length > 0 ? mdcontent : '**等待填坑**';
      let md2html = new Promise(function (resolve, reject) {
        editor.markdownToHTML("article-body", {
          markdown: mdcontent,
          tocContainer: "#article-toc",
          tocDropown: true,
          tex: true, // 默认不解析
        });
        resolve();
      });
      md2html.then(() => {
        const titleElments = document.querySelectorAll(".reference-link");
        // https://www.qy.cn/jszx/detail/6411.html
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting){
              console.log(entry.target);
            }
          });
        });
        let tocContainer = document.querySelector(".markdown-toc-list");
        let liElements = tocContainer.getElementsByTagName("li");
        for (let i = 0; i < liElements.length; i++) {
          let el = liElements[i].firstChild;
          el.addEventListener("click", function (event) {
            event.preventDefault();
            titleElments[i].scrollIntoView({
              behavior: "smooth",
            });
          });
          observer.observe(titleElments[i]);
        }
      });
    }
  });
});

onMounted(() => {
  window.onresize = () =>
    (() => {
      screenWidth.value = document.body.clientWidth;
      console.log(screenWidth.value);
    })();
});
</script>

<style>
.toc-scroll {
  /*要设置滚动条的容器样式*/
  overflow-y: auto;
  width: auto;
  max-height: 500px;
}

.toc-scroll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.toc-scroll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.toc-scroll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

@media (max-width: 500px) {
  .toc-scroll {
    max-height: 300px;
  }
}
</style>