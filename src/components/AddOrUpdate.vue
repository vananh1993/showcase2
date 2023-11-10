<template>
	<transtion>
		<div class="modal-overlay">
			<div class="modal-wrapper">
				<div class="modal-container">
					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
					<input type="text" v-model="showcase.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
					<textarea placeholder="Description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="showcase.description"></textarea>

					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
					<input type="text" v-model="showcase.tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<ul>
						<li></li>
					</ul>
					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumb</label>
					<input type="text" v-model="showcase.imgUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Url</label>
					<input type="text" v-model="showcase.videoUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Web Url</label>
					<input type="text" v-model="showcase.webUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">



		            <button @click="addOrUpdate()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{{ isNew ? 'Add' : 'Update' }}</button>
		            &nbsp; 
		            
		            <button @click="emits('close')" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Close</button>
				</div>
			</div>
		</div>
	</transtion>
    <!-- <div id="modal-update-showcase" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative container w-full max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        test 
                    </h3>
                </div>
                <div class="p-6 space-y-6">
                   <input type="text" placeholder="Title"  v-model="item?.title">
		            <textarea placeholder="Description" v-model="item?.description"></textarea>
		            <input type="text" v-model="item?.imgUrl">
		            <input type="text" v-model="item?.tag" placeholder="Enter tag">
                </div>
                <div class=" text-center  p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click.prevent="emits('close')" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
	import { ref, defineComponent } from 'vue'
	import { db } from '../firebase/index'
	import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

	const props = defineProps({
		data: Object,
		isNew: Boolean,
	})
	defineComponent({
		name: "AddOrUpdate"
	})
	const emits = defineEmits('close');
	const showcase = ref({
		name: '',
		description: '',
		tag : '',
		tags: [],
		imgUrl : '',
		videoUrl : '',
		webUrl: ''
	})
	 const addOrUpdate = async () => {
		if (props.isNew) {
			await addDoc(collection(db, "showcase"), showcase.value).then((res) => {
				emits('close');
			})
		}
		else {
			await updateDoc(collection(db, "showcase"), showcase.value).then((res) => {
				emits('close');
			})
		}
	}
</script>
<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.3);
		width: 100%;
		height: 100%;
		transition: opacity 0.3s ease;
	}
	.modal-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

	}
	.modal-container {
		background: #fff;
		max-width: 400px;
		width: calc(100% - 40px);
		margin-left: 20px;
		margin-right: 20px;
		padding: 30px 20px;
		border-radius: 20px;
	}
	input, textarea {
		width: 90%;
		margin: auto;
		margin-bottom: 20px;
		overflow: hidden;
	}
</style>
