
<template>
  <header>
    <Header/>
  </header>

  <RouterView />
</template>

<style scss scoped>

</style>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './layout/header.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/index'
import { ref, onMounted } from 'vue';

onMounted (() => {
  const querySnapshot = await getDocs(collection(db, "listshowcases"));
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
})
</script>
