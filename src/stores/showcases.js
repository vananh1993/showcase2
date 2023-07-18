import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"
export const useShowcaseStore = defineStore("showcase", {
    state: () => ({
        showcases: [],
    }),
    getters: {
        getShowcases(state){
            // console.log(state.showcases);
            return state.showcases
        },
        // getShowcaseFromCate(state){
        //     return (categoryName) => state.posts.filter((item) => item.category === categoryName)
        // },
        getShowcaseFromTags(state){
            const _tags = [];
            // console.log(state.showcases);
            state.showcases.filter(ele => {
                 const isDuplicate = _tags.includes(ele.tags);
                 // console.log(isDuplicate);
                 return isDuplicate;
                // return ele.tags;
            })
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

        getItemsByPage(page, search = null, tag = null, limit = 12) {
            return new Promise((resolve) => setTimeout(
                () => {
                    search = (search || '').toLowerCase().trim();
                    const searchParts = search.split(' ');

                    // console.info(this.showcases, 99);

                    resolve(this.showcases
                        .map((item) => ({
                            ...item,
                            keywords: item.title.toLowerCase().split(' ')
                        }))
                        .filter((item) => {

                    // console.info(12);
                            let result = true;

                            if (search) {
                                result = item.title.toLowerCase().includes(search)
                                    || item.tags.includes(search)
                                    || item.keywords.some((keyword) => searchParts.includes(keyword));
                            }

                            return result && (!tag ? true : item.tags.includes(tag));
                        })
                        .slice(Math.max(0, page - 1) * limit, page * limit));
                }, 500
            ));
        }
    },
})
