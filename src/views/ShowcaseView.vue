<template>
  <div class="container mx-auto px-4">
    <h1 class=" py-7 text-center text-3xl font-semibold uppercase text-gray-800">{{ title }}</h1>
    <div class="grid grid-cols-4 gap-6 list-showcase">
        <div v-for="showcase in showcases" :key="showcase.id" class=" list-showcase__item max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer overflow-hidden">
            <RouterLink :to="showcase.url"  target="_blank">
                <div>
                    <img :src="'../src/assets/thumb-showcase/' + showcase.imgUrl" alt="">
                </div>
                <div class="py-3 px-4 bg-white">
                    <h3 class="text-lg font-semibold text-gray-600">{{ showcase.title }}</h3>
                </div>
            </RouterLink>
            <ul class="pb-6 px-4">
                <li class="inline-block bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-900" v-for="tag in showcase.tags">
                    <a href="#/">{{ tag }}</a>
                </li>
            </ul>
        </div>

    </div>

  </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { ref, onMounted, computed } from "vue";
    import { useShowcaseStore } from "../stores/showcases";
    const store = useShowcaseStore();
    const title = ref("List Showcase");
    const showcases = computed(() => store.getShowcases);

    // const showcasess = computed(() => {
    //   return store.showcasess;
    // });
    onMounted(() => {
      store.fetchShowcases();
    });
</script>
<style lang="scss" scoped media="screen">
    .list-showcase {
        &__item {
            img {
                height: 200px;
                width: auto;
                object-fit: cover;
            }
        }
        ul {
            a {
                &:hover {
                    background: transparent !important;
                }
            }
        }
    }
</style>
