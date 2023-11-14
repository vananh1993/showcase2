<template>
	<div>
		<h1>Creat an Account</h1>
		<p>
			<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
			<input type="text" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
		</p>
		<p>
			<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
			<input type="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
		</p>
		<p>
			<button @click="register">Submit</button>
		</p>
		<p>
			<button @click="signInWithGoogle">Sign In With Google</button>
		</p>
	</div>
</template>