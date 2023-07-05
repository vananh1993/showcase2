<template>
    <h3>Slug - {{ slug }}</h3>

     <!-- <div v-html="htmlFileContent"></div> -->
     <!-- <template src="../html/bubble/index.html"></template> -->

     <div class="overflow-hidden">
         <iframe width="100%" height="500" :src="'../'+ fileUrlRoute +'/' + fileUrl + '.html'"></iframe>
     </div>
</template>

<script setup>

    import { ref, onMounted, computed } from "vue";
    import { useRoute } from 'vue-router'
    const route = useRoute();
    const fileUrlRoute = ref(route.params.urlroute)
    const fileUrl = ref(route.params.url)
    console.log(fileUrlRoute, fileUrl);
    //
    // const htmlFileContent = require('../html/sting/index.html');


    //
    //
    // import htmlFileContent from `./theme/${fileName}.html`
    // import htmlFileContent from '../html/sting/index'
    // const htmlFileRender = ref("");
    // htmlFileRender.value = htmlFileContent
</script>
<style lang="scss" scoped="">


</style>
