// vite.config.js
import { defineConfig } from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { resolve } from "path";

// src/utils/md-loader-vite.js
import hljs from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/highlight.js/es/index.js";
import { load } from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/cheerio/lib/esm/index.js";
import MarkdownIt from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/markdown-it/index.js";
import mdContainer from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/markdown-it-container/index.js";
import compileSFC from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js";
import compileDOM from "file:///E:/Users/lenovo/fantasy995.github.io/node_modules/@vue/compiler-dom/index.js";
var fileRegex = /\.(md)$/;
var md = new MarkdownIt();
function md_loader_vite_default() {
  return {
    name: "md-loader",
    transform(source, id) {
      if (fileRegex.test(id)) {
        md.set({
          linkify: true,
          // 将类似 URL 的文本自动转换为链接。
          html: false,
          // Enable HTML tags in source
          typographer: true,
          //启用一些语言中立的替换 + 引号美化
          // 代码高亮
          highlight: function(str, lang) {
            lang = lang || "shell";
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' + hljs.highlight(strl, { lang }).value + "</code></pre>";
              } catch (__) {
              }
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
          }
        });
        md.use(mdContainer, "tip");
        md.use(mdContainer, "warning");
        const html = md.render(source);
        const $ = load(html, {
          decodeEntities: false,
          lowerCaseAttributeNames: false,
          lowerCaseTags: false
        });
        const style = $.html("style");
        $("style").remove();
        const temp = $.html();
        const template = `<template>
                      <div class="markdown-body editormd-html-preview">
                        ${html}
                      </div>
                    </template>
                    ${style}`;
        const ret = compileSFC.parse(template);
        const code = compileDOM.compile(ret.descriptor.template.content, { mode: "module" }).code;
        const render = `${code};
                let __script = {};
                __script.render = render;
                  export default __script;`;
        return {
          code: render,
          map: null
        };
      }
    }
  };
}

// vite.config.js
var __vite_injected_original_dirname = "E:\\Users\\lenovo\\fantasy995.github.io";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var vite_config_default = defineConfig({
  plugins: [
    md_loader_vite_default(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "css", ssr: true })]
    })
  ],
  resolve: {
    alias: {
      "@": pathResolve("./src/")
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  ssgOptions: {
    includedRoutes(paths, routes) {
      console.log(paths);
      console.log(routes);
      return paths;
    }
  },
  ssr: {
    noExternal: ["element-plus"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3V0aWxzL21kLWxvYWRlci12aXRlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcVXNlcnNcXFxcbGVub3ZvXFxcXGZhbnRhc3k5OTUuZ2l0aHViLmlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcZmFudGFzeTk5NS5naXRodWIuaW9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1VzZXJzL2xlbm92by9mYW50YXN5OTk1LmdpdGh1Yi5pby92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG4vLyBjb25zdCB7IEJsb2dMaXN0R2VuZXJhdGlvblBsdWdpbiB9ID0gcmVxdWlyZSgnLi9zcmMvdXRpbHMvQmxvZ0xpc3RHZW5lcmF0aW9uUGx1Z2luLmNqcycpO1xyXG4vLyBjb25zdCBBdXRvSW1wb3J0ID0gcmVxdWlyZSgndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZScpXHJcbi8vIGNvbnN0IENvbXBvbmVudHMgPSByZXF1aXJlKCd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJylcclxuLy8gY29uc3QgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gPSByZXF1aXJlKCd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnKVxyXG4vLyBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG4vLyBjb25zdCBtZExvYWRlciA9IHJlcXVpcmUoJy4vc3JjL3V0aWxzL21kLWxvYWRlci12aXRlLmNqcycpO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBtZExvYWRlciBmcm9tICcuL3NyYy91dGlscy9tZC1sb2FkZXItdml0ZS5qcyc7XHJcblxyXG5jb25zdCBwYXRoUmVzb2x2ZSA9IChkaXIpID0+IHtcclxuICAgIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgJy4nLCBkaXIpXHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgbWRMb2FkZXIoKSxcclxuICAgICAgICB2dWUoKSxcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnY3NzJywgc3NyOiB0cnVlIH0pXSxcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgJ0AnOiBwYXRoUmVzb2x2ZSgnLi9zcmMvJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nLCAnLnZ1ZSddLFxyXG4gICAgfSxcclxuICAgIHNzZ09wdGlvbnM6IHtcclxuICAgICAgICBpbmNsdWRlZFJvdXRlcyhwYXRocywgcm91dGVzKSB7XHJcbiAgICAgICAgICAgIC8vIGV4Y2x1ZGUgYWxsIHRoZSByb3V0ZSBwYXRocyB0aGF0IGNvbnRhaW5zICdmb28nXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGhzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocm91dGVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc3NyOiB7XHJcbiAgICAgICAgbm9FeHRlcm5hbDogWydlbGVtZW50LXBsdXMnXSxcclxuICAgIH0sXHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcZmFudGFzeTk5NS5naXRodWIuaW9cXFxcc3JjXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcZmFudGFzeTk5NS5naXRodWIuaW9cXFxcc3JjXFxcXHV0aWxzXFxcXG1kLWxvYWRlci12aXRlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Vc2Vycy9sZW5vdm8vZmFudGFzeTk5NS5naXRodWIuaW8vc3JjL3V0aWxzL21kLWxvYWRlci12aXRlLmpzXCI7Ly8gY29uc3QgaGxqcyA9IHJlcXVpcmUoJ2hpZ2hsaWdodC5qcycpXHJcbi8vIGNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJylcclxuLy8gY29uc3QgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKClcclxuLy8gY29uc3QgbWRDb250YWluZXIgPSByZXF1aXJlKCdtYXJrZG93bi1pdC1jb250YWluZXInKVxyXG4vLyBjb25zdCBjb21waWxlU0ZDID0gcmVxdWlyZSgnQHZ1ZS9jb21waWxlci1zZmMnKTtcclxuLy8gY29uc3QgY29tcGlsZURPTSA9IHJlcXVpcmUoJ0B2dWUvY29tcGlsZXItZG9tJylcclxuaW1wb3J0IGhsanMgZnJvbSAnaGlnaGxpZ2h0LmpzJztcclxuaW1wb3J0IHsgbG9hZCB9IGZyb20gJ2NoZWVyaW8nO1xyXG5pbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XHJcbmltcG9ydCBtZENvbnRhaW5lciBmcm9tICdtYXJrZG93bi1pdC1jb250YWluZXInO1xyXG5pbXBvcnQgY29tcGlsZVNGQyBmcm9tICdAdnVlL2NvbXBpbGVyLXNmYyc7XHJcbmltcG9ydCBjb21waWxlRE9NIGZyb20gJ0B2dWUvY29tcGlsZXItZG9tJztcclxuLy8gaW1wb3J0ICdoaWdobGlnaHQuanMvc3R5bGVzL2dpdGh1Yi5jc3MnO1xyXG5jb25zdCBmaWxlUmVnZXggPSAvXFwuKG1kKSQvXHJcbmNvbnN0IG1kID0gbmV3IE1hcmtkb3duSXQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21kLWxvYWRlcicsXHJcbiAgICAgICAgdHJhbnNmb3JtKHNvdXJjZSwgaWQpIHtcclxuICAgICAgICAgICAgaWYgKGZpbGVSZWdleC50ZXN0KGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbWQuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5raWZ5OiB0cnVlLCAvLyBcdTVDMDZcdTdDN0JcdTRGM0MgVVJMIFx1NzY4NFx1NjU4N1x1NjcyQ1x1ODFFQVx1NTJBOFx1OEY2Q1x1NjM2Mlx1NEUzQVx1OTRGRVx1NjNBNVx1MzAwMlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IGZhbHNlLCAvLyBFbmFibGUgSFRNTCB0YWdzIGluIHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cG9ncmFwaGVyOiB0cnVlLCAgLy9cdTU0MkZcdTc1MjhcdTRFMDBcdTRFOUJcdThCRURcdThBMDBcdTRFMkRcdTdBQ0JcdTc2ODRcdTY2RkZcdTYzNjIgKyBcdTVGMTVcdTUzRjdcdTdGOEVcdTUzMTZcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcclxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChzdHIsIGxhbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZyA9IGxhbmcgfHwgJ3NoZWxsJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhbmcgJiYgaGxqcy5nZXRMYW5ndWFnZShsYW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHByZSBjbGFzcz1cImhsanNcIj48Y29kZT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxqcy5oaWdobGlnaHQoc3RybCwgeyBsYW5nIH0pLnZhbHVlICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvY29kZT48L3ByZT4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoX18pIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxwcmUgY2xhc3M9XCJobGpzXCI+PGNvZGU+JyArIG1kLnV0aWxzLmVzY2FwZUh0bWwoc3RyKSArICc8L2NvZGU+PC9wcmU+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTVCQjlcdTU2NjhcdUZGMEM6Ojp0aXAgXHU0RjFBXHU4RjZDXHU2MzYyXHU0RTNBIDxkaXYgY2xhc3M9XCJ0aXBcIj5cclxuICAgICAgICAgICAgICAgIG1kLnVzZShtZENvbnRhaW5lciwgJ3RpcCcpXHJcbiAgICAgICAgICAgICAgICBtZC51c2UobWRDb250YWluZXIsICd3YXJuaW5nJylcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gbWQucmVuZGVyKHNvdXJjZSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkID0gbG9hZChodG1sLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlRW50aXRpZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VyQ2FzZUF0dHJpYnV0ZU5hbWVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlckNhc2VUYWdzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZSA9ICQuaHRtbCgnc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICQoJ3N0eWxlJykucmVtb3ZlKClcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gJC5odG1sKClcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgYDx0ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXJrZG93bi1ib2R5IGVkaXRvcm1kLWh0bWwtcHJldmlld1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2h0bWx9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgICR7c3R5bGV9YFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0ID0gY29tcGlsZVNGQy5wYXJzZSh0ZW1wbGF0ZSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBjb21waWxlRE9NLmNvbXBpbGUocmV0LmRlc2NyaXB0b3IudGVtcGxhdGUuY29udGVudCwgeyBtb2RlOiAnbW9kdWxlJyB9KS5jb2RlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyID0gYCR7Y29kZX07XHJcbiAgICAgICAgICAgICAgICBsZXQgX19zY3JpcHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIF9fc2NyaXB0LnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICAgICAgICAgICAgZXhwb3J0IGRlZmF1bHQgX19zY3JpcHQ7YFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZTogcmVuZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1MsU0FBUyxvQkFBb0I7QUFDblUsT0FBTyxTQUFTO0FBT2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMsZUFBZTs7O0FDTHhCLE9BQU8sVUFBVTtBQUNqQixTQUFTLFlBQVk7QUFDckIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFFdkIsSUFBTSxZQUFZO0FBQ2xCLElBQU0sS0FBSyxJQUFJLFdBQVc7QUFFWCxTQUFSLHlCQUFvQjtBQUN2QixTQUFPO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixVQUFVLFFBQVEsSUFBSTtBQUNsQixVQUFJLFVBQVUsS0FBSyxFQUFF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
