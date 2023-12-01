<template>
  <div class="mx-auto pb-20">

    <div class="text-center container mx-auto my-10">
        <h1 class="text-3xl section-title font-semibold text-center text-gray-800 dark:text-gray-200">
            {{ title }}
        </h1>
        <p class="text-lg ">See below our collections</p>
    </div>
    <div class=" mt-8 mx-5 md:mx-10  xl:mx-20">
        <div class="mt-8 flex flex-row items-center justify-between">
            <div class="relative basis-1/4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    v-model="search.keyword"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                    @keyup.enter="searchShowcases"
                />
            </div>
            <div class="list-tag flex items-center basis-3/4 md:ml-10 gap-2  overflow-y-auto whitespace-nowrap scrollbar">
                <a href="#/" :class="{ active: null === activeItem}" class="px-3 py-1.5  whitespace-nowrap text-gray-500  rounded-lg bg-gray-100 rounded-lg capitalize] "  @click="selectTag(null); ; toggleActive(null)">All Showcases</a>
                <a href="#/" :class="{ active: index === activeItem}" class="px-3 py-1.5 whitespace-nowrap text-gray-500 rounded-lg bg-gray-100 rounded-lg capitalize"  v-for="(tag,index) in getShowcasesTag" @click.prevent="selectTag(tag); toggleActive(index)" >{{ tag }}</a>
            </div>
        </div>

        <div class="mt-10 md:pl-3">
            <div class="list-showcase grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4  ">
                <ShowcaseItem
                    @selected="selectShowcase"
                    v-for="showcase in showcases" :showcase="showcase" :id="showcase.id"  />
            </div>
        </div>
    </div>
    <Observer @intersect="pageExceededBottom()" />
    <ShowcaseModal :showcase="showcaseDetail" @close="closePopup" />
    <button data-modal-target="modal-showcase-detail" data-modal-toggle="modal-showcase-detail" class="block hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
    </button>
  </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { ref, onMounted, computed } from "vue";
    import Observer from '@/components/IntersectionObserver.vue';
    import ShowcaseModal from '@/components/ModalDetail.vue'
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

    const closePopup = () => {
        modal.hide();
    }

    const selectShowcase = (showcase) => {
        // console.log(showcase);
        modal.show();
        showcaseDetail.value = showcase;
    };

    let activeItem = null;

    const toggleActive = (i) => {
        console.log(i);
        activeItem = i;
    }
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
    .section-title {
        color: #01c38d;
    }
    .list-tag {
        a {
            &.active {
                background-color: #01c38d;
                color: #fff;
            }
        }
    }
</style>
