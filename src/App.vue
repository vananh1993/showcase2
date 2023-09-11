
<!-- <template>
  <header>
    <Header/>
  </header>

  <RouterView />
</template>
 -->



<template>
   <div>
  <Head>
  <!-- Make sure to give your page a title and description in Builder -->
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
  <!-- <NotFound v-if="pageNotFound" /> -->
</div>
</template>

<style scss scoped>

</style>
<script>
  // use this if you are on Vue 2
  // import { getContent, RenderContent, isPreviewing } from '@builder.io/sdk-vue/vue2';
  // OR use this one if you are on Vue 3
  import { getContent, RenderContent, isPreviewing } from '@builder.io/sdk-vue/vue3';
  // import your NotFoundComponent
  import NotFoundComponent from './components/NotFound.vue';

// define vue component
export default {
  name: 'App',
  // Use Builder's RenderContent to show your Builder content
  // Add NotFoundComponent to use in case of no content
  components: {
    RenderContent,
    NotFound: NotFoundComponent,
  },
  data: () => ({
    // boolean to control showing content
    canShowContent: false,
    // content variable to store content from Builder
    content: null,
    // use API key
    apiKey: 'd92538a8f0284f01befc414824730aa0',
  }),
  // mounted() lifecycle hook called after component is in the DOM  
  mounted() {
    // get page model from space (specified by the Public API Key)
    // and the URL
    getContent({
      model: 'page',
      apiKey: 'd92538a8f0284f01befc414824730aa0', // <-- Replace with your Public API Key
      userAttributes: {
        urlPath: window.location.pathname,
      },
    }).then(res => {
      // sets content to results of getContent()
      this.content = res;
      // If there's content or if the page is being viewed in the Visual Editor,
      // set canShowContent to true.
      this.canShowContent = this.content || isPreviewing();
      // If no content is found, set pageNotFound to true.
      // This is used in the template to conditionally render 404 component.
      if (!this.content) {
        this.pageNotFound = true;
      }
    });
  },
  computed: {
    // Provide a default title and default description in case there is no content
    computedTitle() {
      return this.content?.data?.title || 'Default title';
    },
    computedDescription() {
      return this.content?.data?.description || 'Default description';
    },
  },
}
</script>



<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './layout/header.vue';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './firebase/index'
// import { ref, onMounted } from 'vue';

// onMounted (async () => {
//   const querySnapshot = await getDocs(collection(db, "listshowcases"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// })
</script>
 -->