<template>
  <div>
    <p>Test list</p>
    <div v-for="item in listShowcases" :key="item.id">
      <p><a> Title: {{item.title}}</a></p>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase/index'
import { ref, onMounted } from 'vue';
const listShowcases = ref([]);

onMounted (async () => {
  const querySnapshot = await getDocs(collection(db, "listshowcases"));
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    listShowcases.value.push({...doc.data(), id: doc.id})
    // console.log(doc.id, " => ", doc.data());
  });
})
</script>
