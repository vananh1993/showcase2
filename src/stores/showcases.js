// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useShowcaseStore = defineStore('showcase', () => {
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
          const data = await axios.get("./data/list-showcases.json")
            this.users = data.data
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      }
    }

})
