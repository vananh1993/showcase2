<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Made By Getters</h1>
    <div v-for="showcases in getShowcases" :key="showcases.id">
      {{ showcases.id }} {{ showcases.title }} {{ showcases.category }}
    </div>
    <h1>Made By Actions</h1>
    <div v-for="showcases in showcasess" :key="showcases.id">
      {{ showcases.id }} {{ showcases.title }} {{ showcases.category }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useShowcaseStore } from "../stores/showcases";
const store = useShowcaseStore();
const msg = ref("Welcome to my Vuex Store");
const getShowcases = computed(() => {
  return store.getShowcases;
});
const showcasess = computed(() => {
  return store.showcasess;
});
onMounted(() => {
  store.fetchShowcases();
});
</script>
