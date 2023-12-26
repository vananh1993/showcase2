<template>
	<transtion>
		<div class="modal-overlay">
			<div class="modal-wrapper">
				<div class="modal-container">
					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
					<input type="text" v-model="showcase.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
					<textarea placeholder="Description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="showcase.description"></textarea>

					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
					<input type="text" v-model="addTag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Press Enter to add tag" @keyup.enter="addTagItem();">
					<ul class="mb-5 list-tags">
						<li v-for="(tag, index) in showcase.tags" class="inline-block px-3 py-1 text-sm font-small  mt-2 mr-2">
							<span>{{ tag }}</span>
							<span class="text-red-900 list-tags__delete" @click.prevent="deleteTag(index)">
								<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
								    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
								</svg>
							</span>
						</li>
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
	import { ref, defineComponent, onMounted } from 'vue'
	import { db } from '../firebase/index'
	import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

	const props = defineProps({
		data: Object,
		isNew: Boolean,
	})
	defineComponent({
		name: "AddOrUpdate"
	})
	const addTag = ref();

	onMounted( () => {
		showcase.value = {...showcase.value, ...props.data}
	})
	const showcase = ref({
		title: '',
		description: '',
		// tag : '',
		// tags: [],
		imgUrl : '',
		videoUrl : '',
		webUrl: '',
		timestamp: Date.now()
	})
	const addOrUpdate = async () => {
		if (props.isNew) {
			await addDoc(collection(db, "showcase"), showcase.value).then((res) => {
				emits('close');
			})
		}
		else {
			await updateDoc(doc(db, "showcase", props.data.id), showcase.value).then((res) => {
				emits('close');
			})
		}
	}
	const emits = defineEmits('close');


	const addTagItem = () => {
		// console.log(addTag.value);
		showcase.value.tags.push(addTag.value);
	}
	const deleteTag = (index) => {
		showcase.value.tags.splice(index, 1)[0];
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
	.list-tags {
		li {
			position: relative;

		}
		&__delete {
			position: absolute;
			width: 15px;
			height: 15px;
			border: 0px;
			top: 6px;
			right: -5px;
			cursor: pointer;
			svg {
				max-width: 100%;
				height: auto;
			}
		}
	}
</style>
