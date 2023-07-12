<template>
    <div class=" list-showcase__item  rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer overflow-hidden">
        <!-- <RouterLink  target="_blank"> -->
            <div>
                <img :src="'../src/assets/thumb-showcase/' + imgUrl" alt="">
            </div>
            <div class="py-3 px-4 bg-white">
                <h3 class="text-lg font-semibold text-gray-600">{{ title }}-{{id}}</h3>
            </div>
        <!-- </RouterLink> -->
        <ul class="pb-6 px-4">
            <li class="inline-block bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-900 mt-2" v-for="tag in tags">
                <a href="#/">{{ tag }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    id: Number,
    title: String,
    imgUrl: String,
    tags: Array,
})
</script>

<style lang="css" scoped>
</style>
