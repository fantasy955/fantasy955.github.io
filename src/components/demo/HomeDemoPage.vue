<template>
  <div class="container-xxl my-md-4 bd-layout">
    <aside class="bd-sidebar">
      <nav
        class="bd-links collapse"
        id="bd-docs-nav"
        aria-label="Docs navigation"
        style=""
      >
        <ul class="list-unstyled mb-0 py-3 pt-md-1">
          <li class="mb-1" v-for="category in categories" :key="category.name">
            <button
              class="btn d-inline-flex align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              :data-bs-target="`#${category.name}-collapse`"
              aria-expanded="false"
              aria-current="true"
            >
              {{ category.name }}
            </button>

            <div class="collapse" :id="`${category.name}-collapse`" style="">
              <ul class="list-unstyled fw-normal pb-1 small">
                <li v-for="item in category.children" :key="item.name">
                  <router-link
                    :to="{path: '/demo/details', query: {category: category.path, name: item.path}}"
                    class="d-inline-flex align-items-center rounded"
                    aria-current="page"
                    >{{ item.name }}</router-link
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="bd-main order-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import menu from "./menu";
const categories = menu.categories;
</script>

<style scoped>
@media (min-width: 768px) {
  .bd-links {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    display: block !important;
    height: calc(100vh - 7rem);
    padding-left: 0.25rem;
    margin-left: -0.25rem;
    overflow-y: auto;
  }
}

.bd-links .btn::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.bd-links a {
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
}

.bd-links .active {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}

li::marker {
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
  text-transform: none;
  text-indent: 0px !important;
  text-align: start !important;
  text-align-last: start !important;
}

.bd-sidebar {
  grid-area: sidebar;
}

@media (min-width: 992px) {
  .bd-main {
    grid-template-areas: "intro   toc" "content toc";
    grid-template-rows: auto 1fr;
    grid-template-columns: 4fr 1fr;
  }
  .bd-layout {
    grid-template-columns: 1fr 5fr;
  }
}

@media (min-width: 768px) {
  .bd-main {
    display: grid;
    grid-template-areas: "intro" "toc" "content";
    grid-template-rows: auto auto 1fr;
    gap: inherit;
  }
  .my-md-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .bd-layout {
    display: grid;
    grid-template-areas: "sidebar main";
    grid-template-columns: 1fr 3fr;
    gap: 1.5rem;
  }
}

aside {
  background-color: brown;
}

main {
  background-color: blanchedalmond;
  height: 3000px;
}
</style>