<template>
  <div>
    <video
      :src="src"
      :muted="videoMuted"
      :autoplay="autoplay"
      :controls="controls"
      :loop="loop"
      :poster="poster"
      :preload="preload"
      :playsinline="true"
      ref="videoRef"
      class="fss"
    ></video>
    <slot
      name="controls"
      :play="play"
      :pause="pause"
      :toggle-play="togglePlay"
      :playing="playing"
      :percentage-played="percentagePlayed"
      :seek-to-percentage="seekToPercentage"
      :duration="duration"
      :convert-time-to-duration="convertTimeToDuration"
      :video-muted="videoMuted"
      :toggle-mute="toggleMute"
    ></slot>
  </div>
</template>

<script setup>
const EVENTS = [
  "play",
  "pause",
  "ended",
  "loadeddata",
  "waiting",
  "playing",
  "timeupdate",
  "canplay",
  "canplaythrough",
  "statechanged",
];


import { ref, onMounted, defineProps  } from 'vue'

const emits = defineEmits([
  "play",
  "pause",
  "ended",
  "loadeddata",
  "waiting",
  "playing",
  "timeupdate",
  "canplay",
  "canplaythrough",
  "statechanged"
]);
const props = defineProps({
    src: { type: String, required: true },
    controls: { type: Boolean, required: false, default: false },
    loop: { type: Boolean, required: false, default: false },
    width: { type: Number, required: false, default: 500 },
    height: { type: Number, required: false, default: 281 },
    autoplay: { type: Boolean, required: false, default: false },
    muted: { type: Boolean, required: false, default: false },
    poster: { type: String, required: false },
    preload: { type: String, required: false, default: "auto" },
})


const videoRef = ref();

let playing = ref(false);
let duration = ref(0);
let percentagePlayed = ref(0);
let videoMuted = ref(false);

onMounted(async () => {
  bindEvents();
});

const bindEvents = () => {
  EVENTS.forEach((event) => {
    bindVideoEvent(event);
  });
};

const setPlaying = (state) =>  {
  playing.value = state;

  state ? videoRef.value.play() : videoRef.value.pause();
};

const instance = {
  setPlaying,
};

const bindVideoEvent= (which)=> {
  const player = videoRef.value;

  player.addEventListener(
    which,
    (event) => {
      if (which === "loadeddata") {
        duration = player.duration;
      }

      if (which === "timeupdate") {
        percentagePlayed =
          (player.currentTime / player.duration) * 100;
      }

      emits(which, { event, player: instance });
    }
  )
}

const togglePlay = () => setPlaying(!playing.value);

const seekToPercentage = (percentage) => {
  videoRef.value.currentTime = (percentage / 100) * duration;
}

const convertTimeToDuration = (seconds) => {
  return [parseInt((seconds / 60) % 60, 10), parseInt(seconds % 60, 10)]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}

const toggleMute = () => videoMuted.value = !videoMuted.value;

defineExpose(instance);

</script>
<style lang="scss" scoped>

video {
    width: 100%;
}
</style>