<template>
    <div id="modal-showcase-detail" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative container w-full max-h-full">
            <!-- Modal content -->
            <div class="relative bg-black text-white shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4  rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-whire-900">
                        test {{ showcase?.title }}
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        @click.prevent="emits('close');"
                        >
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <ul class="pb-6 pl-5 px-0">
                    <li class="inline-block text-gray-800 mr-3 " v-for="tag in showcase?.tags">
                        <a  class="inline-block  px-4 py-1 border rounded-full text-sm font-medium hover:bg-gray-900 mt-2" href="#/">{{ tag }}</a>
                    </li>
                </ul>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="t-center">
                        <img class="mx-auto" v-if="!showcase?.videoUrl" :src="showcase?.imgUrl" alt="" />
                        <!-- <video  v-if="showcase?.videoUrl" :src="showcase?.videoUrl" data-test="video-content" preload="auto" playsinline="true" loop="loop" draggable="false" class="" autoplay="autoplay"></video> -->
                        <videoplayer
                        v-if="showcase?.videoUrl"
                        class="videoplayer"
                        :src="showcase?.videoUrl"
                        :muted="true"
                        :autoplay="true"
                        :controls="false"
                        :loop="true"
                        @play="onPlayerPlay"
                        @pause="onPlayerPause"
                        @ended="onPlayerEnded"
                        @loadeddata="onPlayerLoadeddata"
                        @waiting="onPlayerWaiting"
                        @playing="onPlayerPlaying"
                        @timeupdate="onPlayerTimeupdate"
                        @canplay="onPlayerCanplay"
                        @canplaythrough="onPlayerCanplaythrough"
                        @statechanged="playerStateChanged"
                        >
                            <template
                                v-slot:controls="{
                                togglePlay,
                                playing,
                                percentagePlayed,
                                seekToPercentage,
                                duration,
                                convertTimeToDuration,
                                videoMuted,
                                toggleMute,
                                }"
                                >
                            <div class="videoplayer-controls">
                                <button @click="togglePlay()" class="videoplayer-controls-toggleplay">
                                    {{ playing ? "pause" : "play" }}
                                </button> &nbsp;
                                <button @click="toggleMute()" class="videoplayer-controls-togglemute">
                                    <!-- {{ videoMuted ? "unmute" : "mute" }} -->
                                    <svg height="24" v-if="videoMuted" fill="currentColor" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabindex="-1" class="mute-icon"><path d="M21.414 12l2.293-2.293a1 1 0 00-1.414-1.414L20 10.586l-2.293-2.293a1 1 0 00-1.414 1.414L18.586 12l-2.293 2.293a1 1 0 101.414 1.414L20 13.414l2.293 2.293a1 1 0 001.414-1.414zM3 6a3 3 0 00-3 3v6a3 3 0 003 3h2.649L12 23V1L5.649 6z"></path></svg>
                                    <svg height="24" v-if="!videoMuted" fill="currentColor" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabindex="-1" class="mute-icon"><path d="M3 6a3 3 0 00-3 3v6a3 3 0 003 3h2.649L12 23V1L5.649 6zm17 6a8.251 8.251 0 00-2.271-5.686 1 1 0 00-1.454 1.374 6.253 6.253 0 010 8.626 1 1 0 101.453 1.374A8.25 8.25 0 0020 12zM18.6 1.2a1 1 0 10-1.2 1.6 11.5 11.5 0 010 18.4 1 1 0 101.2 1.6 13.5 13.5 0 000-21.6z"></path></svg>
                                </button>
                            </div>
                        </template>
                    </videoplayer>
                    </div>
                    <div>
                    </div>
                    <div class="text-justify" v-html="showcase?.description">
                    </div>
                </div>
                <!-- Modal footer -->
                <div class=" text-center  p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <a
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        :href="showcase?.imgUrl"
                        target="_blank"
                        >
                    View Demo
                    </a>
                    <button @click.prevent="emits('close');" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    // import { ref, onMounted, computed } from "vue";
    import { ref } from "vue";
    
    import videoplayer from "@/components/videoplayer.vue";
    
    
    
    const props = defineProps({
        showcase: {
            type: Object,
            default: null
        },
        title: String,
    });
    const emits = defineEmits('close');
    let time = ref('');
    
    
    const onPlayerPlay = ({ event, player }) => {
      // console.log(event.type);
      player.setPlaying(true);
    };
    const onPlayerPause = ({ event, player }) => {
      // console.log(event.type);
      player.setPlaying(false);
    };
    const onPlayerEnded = ({ event, player }) => {
      // console.log(event.type);
      player.setPlaying(false);
    };
    const onPlayerLoadeddata = ({ event }) => {
      // console.log(event.type);
    };
    const onPlayerWaiting = ({ event }) => {
      // console.log(event.type);
    };
    const onPlayerPlaying = ({ event })  =>{
      // console.log(event.type);
    };
    const onPlayerTimeupdate = ({ event }) => {
      time = event.target.currentTime;
      // console.log({ event: event.type, time: event.target.currentTime });
    };
    const onPlayerCanplay = ({ event }) => {
      // console.log(event.type);
    };
    const onPlayerCanplaythrough = ({ event }) => {
      // console.log(event.type);
    };
    const playerStateChanged = ({ event }) => {
      // console.log(event.type);
    }
    
    
</script>
<style lang="scss" scoped>
    .videoplayer {
        position: relative !important;
        display: block;
        width: 70%;
        margin: 0 auto;
    }
    .videoplayer-controls {
        position: absolute;
        bottom: 0;
        left: 10px;
        width: 100%;
        color: #fff;
    }
</style>