<template>
  <div class="container">
    <h1 class="text-center">{{ title }}</h1>
    <div class="row">
        <div class="col-sm-4 mt-4" v-for="showcase in showcases" :key="showcase.id">
            <RouterLink :to="'/showcase/' + showcase.category">
                <div class="">
                    <img :src="showcase.image" alt="">
                    <p>{{ showcase.text }}</p>
                </div>
            </RouterLink>

            <ul>
                <li v-for="tag in showcase.tags">
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

</style>
