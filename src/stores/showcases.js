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
                const data = await axios.get("../src/data/list-showcases.json")
                    this.showcases = data.data
                }
                catch (error) {
                // alert(error)
                console.log(error)
            }
        },

        getItemsByPage(page, search = null, limit = 12) {
            return new Promise((resolve) => setTimeout(
                () => {
                    if (!search) {
                        return resolve(this.showcases.slice(Math.max(0, page - 1) * limit, page * limit));
                    }

                    search = search.toLowerCase().trim();
                    const searchParts = search.split(' ');

                    resolve(this.showcases
                        .map((item) => ({
                            ...item,
                            keywords: item.title.toLowerCase().split(' ')
                        }))
                        .filter((item) => {
                            return item.title.toLowerCase().includes(search)
                                || item.keywords.some((keyword) => searchParts.includes(keyword));
                        })
                        .slice(Math.max(0, page - 1) * limit, page * limit));
                }, 500
            ));
        }
    },
})
