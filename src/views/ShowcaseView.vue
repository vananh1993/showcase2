<template>
  <div class="mx-auto pb-20">
    <div class="banner-top mx-auto">
        <div class="banner-top__bg">
            <img src="../assets/img/bg-banner.png" alt="">
        </div>
        <div class="banner-top__content basis-1/3">
            <h1 class="pb-6 text-center text-3xl font-semibold uppercase text-white-800">{{ title }}</h1>
            <input
                type="text"
                v-model="search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                @keyup.enter="searchShowcases"
            />
        </div>
    </div>
    <div class="flex mt-8 mx-20">
        <div class="basis-3/4">
            <div class="list-showcase grid grid-cols-4 gap-8  ">
                <Item v-for="showcase in showcases" id="showcase.id" title="showcase.title" />
                <!--  -->
                <!-- <div v-for="showcase in showcases" :key="showcase.id" class=" list-showcase__item  rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer overflow-hidden">
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
                </div> -->
            </div>
        </div>
        <div class="basis-1/4 pl-6">
            <h2>Tags</h2>
            <div class="" v-for="tag in getShowcasesTag">
                {{ tag }}
            </div>

        </div>

    </div>
    <Observer v-if="enabled" @intersect="getItems" />

  </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { ref, onMounted, computed } from "vue";
    import Observer from '@/components/IntersectionObserver.vue';
    import Item from '@/components/Item.vue';
    import { useShowcaseStore } from "../stores/showcases";
    const store = useShowcaseStore();

    const limit = 12;

    const title = ref("List Showcase");
    const page = ref(0);
    const enabled = ref(false);
    const search = ref();
    const showcases = ref([]);

    // const tags = store.getShowcaseFromTags;
    // console.log(tags);
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
    // const _tag = [];
    const getShowcasesTag = computed(() => {
        return [...new Set(store.getShowcases.map((item) => item.tags).flat())];

    });
</script>
<style lang="scss" scoped media="screen">
    .banner-top {
        position: relative;
        width: 100%;
        height: 500px;
        background: #111827;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        &__content{
            position: relative;
            z-index: 2;
        }
        &__bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .list-showcase {
        &__item {
            img {
                width: 100%;
                height: 80%;
                // width: auto;
                object-fit: cover;
                object-position: center;
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
