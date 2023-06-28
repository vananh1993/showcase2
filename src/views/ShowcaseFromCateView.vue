<template>
  <div class="container">
    <h1 class="text-center">{{ title }}</h1>
    <div class="row">
        <div class="col-sm-4 mt-4" v-for="showcases in getShowcases" :key="showcases.id">
            <div class="">
                <img src="../assets/thumb-showcase/350x200.png" alt="">
                <p>{{ showcases.title }}</p>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
    import { ref, onMounted, computed } from "vue";
    import { useShowcaseStore } from "../stores/showcases";
    const store = useShowcaseStore();
    const title = ref("List Showcase");
    const getShowcases = computed(() => {
      return store.getShowcases;
    });
    // const showcasess = computed(() => {
    //   return store.showcasess;
    // });
    onMounted(() => {
      store.fetchShowcases();
    });
</script>
<style lang="scss" scoped media="screen">

</style>
