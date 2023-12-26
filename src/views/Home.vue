<!-- <template>
  <div>
    <p>Test list</p>
    <div v-for="item in listShowcases" :key="item.id">
      <p><a> Title: {{item.title}}</a></p>
    </div>
  </div>
</template> -->

<template>
  <div class="mx-auto pb-10">

    <div class="text-center container mx-auto my-10">
        <h1 class="text-3xl section-title font-semibold text-center text-gray-800 dark:text-gray-200">
            {{ title }}
        </h1>
        <p class="text-lg ">See below our collections</p>
    </div>
    <div>
        <AddOrUpdate @close="toggleShow()" v-if="showPopup" :data="data" :isNew="isNew"/>
    </div>
    
    
    <div class=" mt-8 mx-5 md:mx-10  xl:mx-10">
        <div class="mt-8 flex flex-row items-center justify-between">
            
            <!-- <div class="relative basis-1/4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    v-model="search.keyword"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                    @keyup.enter="searchShowcases"
                />
            </div> -->
            <!-- <div class="list-tag flex items-center md:ml-2 pb-3 gap-2  overflow-y-auto whitespace-nowrap scrollbar">
                <a href="#/" :class="{ active: null === activeItem}" class="px-4 py-1.5  whitespace-nowrap text-gray-500  rounded-lg bg-gray-100 rounded-lg capitalize] "  @click="selectTag(null); ; toggleActive(null)">All Showcases</a>
                <a href="#/" :class="{ active: index === activeItem}" class="px-4 py-1.5 whitespace-nowrap text-gray-500 rounded-lg bg-gray-100 rounded-lg capitalize"  v-for="(tag,index) in getTagsOfShowcases" @click.prevent="selectTag(tag); toggleActive(index)" >{{ tag }}</a>
            </div> -->
        </div>

        <div class="mt-10 md:pl-3">
            <button @click="toggleShow()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"  v-if="isLoggedIn">Add Showcase</button>
            <div class="list-showcase mt-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4  ">
                <!-- @showPopupEdit="editShowcase(id)" -->
                <ShowcaseItem
                    v-for="showcase in listShowcases" 
                    :showcase="showcase" :id="showcase.id"
                    :isLoggedIn="isLoggedIn"
                    @selected="selectShowcase(showcase)"
                    @showPopupEdit="toggleShow(showcase, false)"
                    @deleteItem="deleteShowcase(showcase.id)"
                />
            </div>
        </div>
    </div>
    <!-- <Observer @intersect="pageExceededBottom()" /> -->
    <ShowcaseModal :showcase="showcaseDetail"  @close="closePopup"/>
    <button data-modal-target="modal-showcase-detail" data-modal-toggle="modal-showcase-detail" class="block hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
    </button>
  </div>


</template>

<script setup>
import { collection, getDocs, orderBy, doc, deleteDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { db } from '../firebase/index'
import { ref, onMounted, computed } from 'vue';
import ShowcaseModal from '@/components/ModalDetail.vue'
import ShowcaseItem from '@/components/ShowcaseItem.vue';
import { initFlowbite, Modal } from 'flowbite'
import AddOrUpdate from '@/components/AddOrUpdate.vue';


const title = ref("List Showcases");
const listShowcases = ref([]);
let showcaseDetail = ref(null);
let textTest = ref("");
let modal;
const showcaseUpdate = ref([]);
const showPopup = ref(false);
const data = ref({

})
const isNew = ref(true);
let auth;
const isLoggedIn = ref(false);

onMounted (async () => {
    auth = getAuth();
    modal = new Modal(document.getElementById('modal-showcase-detail'));
    initFlowbite();
    const querySnapshot = await getDocs(collection(db, "showcase"), orderBy("title"));

    querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        listShowcases.value.push({...doc.data(), id: doc.id})
    });


    onAuthStateChanged( auth, (user) => {
        // console.log(isLoggedIn.value);
        if(user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    })
})

 const closePopup = () => {
      modal.hide();
  }


const selectShowcase = (showcase) => {
    // console.log(showcase);
    modal.show();
    showcaseDetail.value = showcase;
    // console.log(showcaseDetail);
};
const editShowcase = (id) => {
    // console.log(showcase);
    modal.show();
    // showcaseDetail.value = showcase;
    // console.log(showcaseDetail);
};

const toggleShow = (docData = {}, isNewDoc = true ) => {
    data.value = docData;
    isNew.value = isNewDoc;
    showPopup.value = !showPopup.value;
}
const deleteShowcase = async (id) => {
    // console.log(id);
    await deleteDoc(doc(db, "showcase", id));
}

const getTagsOfShowcases = computed(() => {
    return [...new Set(listShowcases.value.map((item) => item.tags).flat())];


});
const selectTag = (tag) => {

}

</script>
<style  lang="scss" scoped>
    .list-tag {
        &::-webkit-scrollbar{
            height: 4px;
            width: 4px;
            background: gray;
        }
        &::-webkit-scrollbar-thumb:horizontal{
            background: #000;
            border-radius: 10px;
        }
    }
</style>