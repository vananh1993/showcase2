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
        }
    },
    actions: {
        async fetchShowcases() {
            try {
                const data = await axios.get("./src/data/list-showcases.json")
                    this.showcases = data.data
                }
                catch (error) {
                alert(error)
                console.log(error)
            }
        }
    },
})
