<template>
	<div class="mx-auto pb-20">
		<div class="mt-8 mx-5 md:mx-10  xl:mx-20">
			<h1>Sign In </h1>
			<p>
				<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
				<input type="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</p>
			<p>
				<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
				<input type="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</p>
			<p v-if="errMsg">{{ errMsg }}</p>
			<p>
				<button @click="register" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button> &nbsp;
				<button @click="signInWithGoogle" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In With Google</button>
			</p>
			
		</div>
	</div>
</template>
<script setup>
	import { ref } from "vue";
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const email = ref("");
	const password = ref("");
	const errMsg = ref("");
	const register = () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email.value, password.value).then((data) => {
			console.log('test');
			route.push('/');
		})
		.catch((error) => {
			console.log(error.code);
			switch (error.code) {
				case "auth/invalid-email":
					errMsg.value = "Invalid email"
					break;
				case "auth/user-not-found":
					errMsg.value = "No account with that email was found"
					break;
				case "auth/wrong-password":
					errMsg.value = "Incorrect password"
					break;
			}
		})
	};
	const signInWithGoogle = () => {

	};
</script>