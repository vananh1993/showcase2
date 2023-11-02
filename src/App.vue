
<template>
  <header>
    <Header/>
  </header>

  <RouterView />
</template>



<!-- <template>
   <div>
  <Head>
    <title :title="computedTitle"></title>
    <meta name="description" :content="computedDescription" />
  </Head>
  <div>Hello world from your Vue project. Below is Builder Content:</div>
  <div v-if="canShowContent">
    <div>
      page title:
      {{ (content && content.data && content.data.title) }}
    </div>
    <RenderContent
      model="page"
      :content="content"
      :api-key="apiKey"
    />
  </div>
</div>
</template> -->

<style scss scoped>

</style>
<!-- <script>
  import { getContent, RenderContent, isPreviewing } from '@builder.io/sdk-vue/vue3';
  import NotFoundComponent from './components/NotFound.vue';
  import { REGISTERED_COMPONENTS } from './init-builder.js';
  export default {
    name: 'App',
    components: {
      RenderContent,
      NotFound: NotFoundComponent,
    },
    data: () => ({
      canShowContent: false,
      content: null,
      apiKey: 'd92538a8f0284f01befc414824730aa0',
    }),
    mounted() {
      getContent({
        model: 'page',
        apiKey: 'd92538a8f0284f01befc414824730aa0',
        userAttributes: {
          urlPath: window.location.pathname,
        },
      }).then(res => {
        this.content = res;
        this.canShowContent = this.content || isPreviewing();
        if (!this.content) {
          this.pageNotFound = true;
        }
      });
    },
    computed: {
      computedTitle() {
        return this.content?.data?.title || 'Default title';
      },
      computedDescription() {
        return this.content?.data?.description || 'Default description';
      },
    },
    method : {
       getRegisteredComponents() {
        return REGISTERED_COMPONENTS;
      },
    }
  }
</script>
 -->


<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './layout/header.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/index'
import { ref, onMounted } from 'vue';

onMounted (async () => {
  const querySnapshot = await getDocs(collection(db, "listshowcases"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
})
</script>
