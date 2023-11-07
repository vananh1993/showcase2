<template>
  <div>Hello {{ text?.title }}!</div>
</template>
<script setup>
  // const props = defineProps({
  //     text: {
  //         type: String,
  //         default: 'world',
  //     },
  // });

const props = defineProps({
    text: {
        type: Object,
        default: null
    },
    title: String,
});
</script>