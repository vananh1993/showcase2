
<template >
    <nav class="border-gray-200 bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center">
                 <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" />
            </a>
            
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                <div class="relative mt-3 md:hidden">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="search-navbar"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                    <li>
                        <li><RouterLink class="block text-white" to="/">Home</RouterLink></li>
                    </li>
                    <li>
                        <li><RouterLink class="block text-white" to="/list">Showcase</RouterLink></li>
                    </li>
                </ul>
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                    <li>
                        <li><RouterLink class="block text-white" to="/register">Sign up</RouterLink></li>
                    </li>
                    <li>
                        <li><RouterLink class="block text-white" to="/login">Log in</RouterLink></li>
                    </li>
                    <li>
                        <li> <a href="#/" @click="handleSignOut"></a>Sign out </li>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


</template>

<script setup>
import { ref , onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false);


let auth;
const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/")
    })
}
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged( auth, (user) => {
        if(user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    })
})
</script>

<style lang="scss" scoped>
    .logo {

    }
</style>
