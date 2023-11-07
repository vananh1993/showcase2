<template>
	<div>
		<h1>Creat an item</h1>
		<p>
			<input type="text" name="" v-model="title">
		</p>
		<p>
			<input type="text" name="" v-model="description">
		</p>
		<p>
			<button @click="register">Submit</button>
		</p>
		<p>
			<!-- <button @click="signInWithGoogle">Sign In With Google</button> -->
		</p>
	</div>
</template>
<script setup>
	import { ref } from "vue";
	const title = ref("");
	const description = ref("");

	const register = () => {

	};
	// const signInWithGoogle = () => {

	// };
</script>