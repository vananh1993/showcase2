<template>
  <div class="container mx-auto px-4 pt-10 pb-20">
    <input
        type="text"
        v-model="search"
        class="border border-gray-600 p-4"
        @keyup.enter="searchShowcases"
    />
    <h1 class=" py-7 text-center text-3xl font-semibold uppercase text-gray-800">{{ title }}</h1>
    <div class="grid grid-cols-4 gap-6 list-showcase">
        <div v-for="showcase in showcases" :key="showcase.id" class=" list-showcase__item max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer overflow-hidden">
            <RouterLink :to="showcase.url"  target="_blank">
                <div>
                    <img :src="'../src/assets/thumb-showcase/' + showcase.imgUrl" alt="">
                </div>
                <div class="py-3 px-4 bg-white">
                    <h3 class="text-lg font-semibold text-gray-600">{{ showcase.title }}-{{showcase.id}}</h3>
                </div>
            </RouterLink>
            <ul class="pb-6 px-4">
                <li class="inline-block bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-900" v-for="tag in showcase.tags">
                    <a href="#/">{{ tag }}</a>
                </li>
            </ul>
        </div>

        <!-- .... -->
    </div>

    <Observer v-if="enabled" @intersect="getItems" />

  </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { ref, onMounted, computed } from "vue";
    import Observer from '@/components/IntersectionObserver.vue';
    import { useShowcaseStore } from "../stores/showcases";
    const store = useShowcaseStore();
    
    const limit = 12;

    const title = ref("List Showcase");
    const page = ref(0);
    const enabled = ref(false);
    const search = ref();
    const showcases = ref([]);

    onMounted(async () => {
      await store.fetchShowcases();

      enabled.value = true;
    });

    const searchShowcases = async () => {
        enabled.value = false;
        showcases.value = [];
        page.value = 0;

        await getItems();

        enabled.value = true;
    };

    const getItems = async () => {
        page.value++;
        showcases.value = [
            ...showcases.value,
            ...(await store.getItemsByPage(page.value, search.value, limit))
        ];
    }
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
