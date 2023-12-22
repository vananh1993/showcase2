<template>
    <div class=" list-showcase__item  overflow-hidden border-gray-200 hover:border-gray-400  transition duration-500 cursor-pointer overflow-hidden ">
        <!-- <RouterLink  target="_blank"> -->
            <div class="" @click.prevent="emits('selected', showcase)">
                <div class="list-showcase__item__thumb">
                    <img :src="props.showcase.imgUrl" alt="" class="transition rounded duration-500 hover:scale-105">
                </div>
                <div class="py-3 px-0">
                    <h3 class="text-lg font-semibold text-gray-600">{{ props.showcase.title }}</h3>
                </div>
            </div>
        <!-- </RouterLink> -->
        <!-- <ul class="pb-6 px-0">
            <li class="inline-block bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-900 mt-2" v-for="tag in props.showcase.tags">
                <a href="#/">{{ tag }}</a>
            </li>
        </ul> -->
        <div class="flex pb-3">
            <div class="">
                <a href="#/" v-if="isLoggedIn" @click.prevent="emits('showPopupEdit', showcase.id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Item</a>
            </div>
            <div class="">
                <a href="#/" v-if="isLoggedIn" @click.prevent="emits('deleteItem', id)" class="text-white bg-black hover:bg-black-800 focus:outline-none focus:ring-4 focus:ring-black-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-black-600 dark:hover:bg-black-700 ">Delete Item</a>
            </div>
        </div>
        
    </div>
</template>

<script setup>
// import Modal from '@components/Modal/Modal.vue'
// import Modal from '@/components//Modal/Modal.vue';
// const props = defineProps({
//     id: Number,
//     title: String,
//     imgUrl: String,
//     tags: Array,
// });
const props = defineProps({
    showcase: {
        type: Object,
        default: null
    },
    isLoggedIn: Boolean,
    title: String,
});
const emits = defineEmits(['selected', 'showPopupEdit', 'deleteItem']);
</script>

<style lang="scss" scoped>
    .list-showcase {
        &__item {
            img {
                width: 100%;
                height: 300px;
                // width: auto;
                object-fit: cover;
                object-position: center;
                @media only screen and (max-width: 768px) {
                    height: 200px;
                }
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
