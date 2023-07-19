<template>
  <div class="mx-auto pb-20">
    <div class="banner-top mx-auto">
        <div class="banner-top__bg">
            <img src="../assets/img/bg-banner.png" alt="">
        </div>
        <div class="banner-top__content md:basis-1/3">
            <h1 class="pb-6 text-center text-3xl font-semibold uppercase text-white-800">{{ title }}</h1>
            <input
                type="text"
                v-model="search.keyword"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                @keyup.enter="searchShowcases"
            />
        </div>
    </div>
    <div class=" mt-8 mx-5 md:mx-10  xl:mx-20">
        <div class="mt-8 flex items-center justify-between space-x-2">
            <div class="relative inline-block w-auto">
                <a href="#/" class="px-3 py-1.5  whitespace-nowrap text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg capitalize"  @click="selectTag(null)">All Showcases</a>
            </div>
            <div class="flex items-center space-x-4 overflow-y-auto whitespace-nowrap scrollbar">
                <a class="px-3 py-1.5  whitespace-nowrap text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg capitalize"  v-for="tag in getShowcasesTag" @click.prevent="selectTag(tag)">{{ tag }}</a>
                <a class="px-3 py-1.5  whitespace-nowrap text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg capitalize"  v-for="tag in getShowcasesTag" @click.prevent="selectTag(tag)">{{ tag }}</a>
                <a class="px-3 py-1.5  whitespace-nowrap text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg capitalize"  v-for="tag in getShowcasesTag" @click.prevent="selectTag(tag)">{{ tag }}</a>
                <button hide data-modal-target="modal-showcase-detail" data-modal-toggle="modal-showcase-detail" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                  Toggle modal
                </button>
            </div>
        </div>

        <div class="mt-10 md:pl-3">
            <div class="list-showcase grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4  ">
                <ShowcaseItem
                    @selected="selectShowcase"
                    v-for="showcase in showcases" :showcase="showcase" :id="showcase.id" :title="showcase.title" :imgUrl="showcase.imgUrl" :tags="showcase.tags"  />

            </div>
        </div>
    </div>
    <Observer @intersect="pageExceededBottom()" />
    <ShowcaseModal :showcase="showcaseDetail" />
  </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { ref, onMounted, computed } from "vue";
    import Observer from '@/components/IntersectionObserver.vue';
    import ShowcaseModal from '@/components/Modal.vue'
    import ShowcaseItem from '@/components/ShowcaseItem.vue';
    import { useShowcaseStore } from "../stores/showcases";
    const store = useShowcaseStore();
    import { initFlowbite, Modal } from 'flowbite'

    const limit = 12;

    const showcases = ref([]);
    const showcaseDetail = ref(null);

    const title = ref("List Showcase");
    const page = ref(0);
    const search = ref({
        keyword: null,
        tag: null
    });
    let modal;
    let enableObserver = true;

    onMounted(async () => {
        modal = new Modal(document.getElementById('modal-showcase-detail'));
        initFlowbite();
        store.fetchShowcases();
    });

    const selectShowcase = (showcase) => {
        console.log(showcase);
        modal.show();
        showcaseDetail.value = showcase;
    };

    const selectTag = async (tag) => {
        search.value.tag = tag;
        enableObserver = false;

        await getItems(true);

        enableObserver = true;
    };

    const searchShowcases = async () => {
        enableObserver = false;

        await getItems(true);

        enableObserver = true;
    };

    const pageExceededBottom = () => {
        if (!enableObserver) {
            return;
        }

        page.value++;

        getItems();
    };

    const getItems = async (reset = false) => {
        if (reset) {
            page.value = 1;
            showcases.value = [];
        }


        showcases.value = [
            ...showcases.value,
            ...(await store.getItemsByPage(page.value, search.value.keyword, search.value.tag, limit))
        ];
    };

    // const _tag = [];
    const getShowcasesTag = computed(() => {
        return [...new Set(store.getShowcases.map((item) => item.tags).flat())];

    });

</script>
<style lang="scss" scoped media="screen">
    .scrollbar::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    /* Track */
    .scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    /* Handle on hover */
    .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

    .banner-top {
        position: relative;
        width: 100%;
        height: 350px;
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
    
</style>
