

<script setup>




import { ref, onMounted, computed } from "vue";
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
// import { getShowcaseFromCate } from '../stores/showcases'
import { useShowcaseStore } from "../stores/showcases"
const route = useRoute()
// const { authors } = storeToRefs(useShowcaseStore())
// import Cate from '../components/Cate.vue'

// console.log(route.params.category);
// console.log(route.params.category);
const store = useShowcaseStore();


const getShowcases = computed(() => {
  return store.getShowcases.filter((item) => item.category == route.params.category);
});
// const showcasess = computed(() => {
//   return store.showcasess;
// });
onMounted(() => {
  store.fetchShowcases();
});
// const getShowcasesFromCate = computed(() => {
//   return store.fetchShowcases.filter((item) => item.category == route.params.category)
// });


</script>

<template>
  <div class="container">
    <!-- <h1 class="text-center">{{ title }}</h1> -->
    <div class="row">
        <div class="col-sm-4 mt-4" v-for="showcases in getShowcases" :key="showcases.id">
            <div class="">
                <img src="../assets/thumb-showcase/350x200.png" alt="">
                <p>{{ showcases.title }}</p>
            </div>
        </div>

        <p>User id: {{ $route.params.category }}</p>
    </div>

  </div>
</template>

<style lang="scss" scoped media="screen">

</style>
