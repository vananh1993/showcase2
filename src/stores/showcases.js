import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"
export const useShowcaseStore = defineStore("showcase", {
    state: () => ({
        showcases: [],
    }),
    getters: {
        getShowcases(state){
            return state.showcases
        },
        getShowcaseFromCate(state){
          return (categoryName) => state.posts.filter((item) => item.category === categoryName)
        }
    },
    actions: {
        async fetchShowcases() {
            try {

                const data = await axios.get('https://dummyapi.io/data/v1/post?limit=10', {
                    headers: {
                    'app-id': import.meta.env.VITE_APP_DUMMY_API_KEY
                    }
                });

                this.showcases = data.data.data;

            } catch (error) {
                // alert(error)
                console.log(error)
            }
        }
    },
})
