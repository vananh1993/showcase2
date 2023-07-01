<script setup>
  import { RouterLink } from 'vue-router'
  import { storeToRefs } from 'pinia'
  defineProps(['post'])

  // const { getPostComments } = storeToRefs(useCommentStore())
  // const { fetchComments } = useCommentStore()

  // fetchComments()
</script>

<template>
  <div>
    <div>
      <h2>hihih {{ post.title }}</h2>
      <!-- <p>{{ post.body }}</p> -->
    </div>
    <hr>
    <h3>Comments:</h3>
  </div>
</template>
