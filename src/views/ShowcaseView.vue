<script setup>
import axios from 'axios';
import TheWelcome from '../components/TheWelcome.vue';

let config = {
  headers: {
    'app-id': import.meta.env.VITE_APP_DUMMY_API_KEY,
  }
};

// console.log(import.meta.env.VITE_APP_DUMMY_API_KEY)

axios.get('https://dummyapi.io/data/v1/post?limit=10', config).then(console.log);
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
