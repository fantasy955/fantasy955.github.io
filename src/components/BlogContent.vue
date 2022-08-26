<template>
  <div class="row">
    <div class="col-md-8 border order-1" role="main">
      <div id="article-body">加载中</div>
    </div>
    <div class="col-md-3 pl-3 order-2" id="div-article-toc">
      <div
        class="sticky-top mr-1 toc-scroll"
        style="top: 90px"
        id="article-toc"
      ></div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import MathJax from "../js/MathJax";
import editormd from "editor.md/src/editormd";
import { defineProps, onMounted, inject } from "vue";

const probs = defineProps({
  blogPath: {
    type: String,
    required: true,
  },
});

var getBlogContent = axios.get(probs.blogPath);

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
      let editor = editormd().markdownToHTML("article-body", {
        markdown: mdcontent,
        tocContainer: "#article-toc",
        tocDropown: false,
        tex: true, // 默认不解析
      });
    }
  });
});
</script>

<style>
.toc-scroll {
  /*要设置滚动条的容器样式*/
  overflow-y: scroll;
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