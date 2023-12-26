<template>
  <div class="test-video">
    <video
      :src="src"
      :muted="muted"
      :autoplay="autoplay"
      :controls="controls"
      :loop="loop"
      :poster="poster"
      :preload="preload"
      :playsinline="true"
      ref="player"
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

<script>
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


import { ref, defineComponent, onMounted, defineProps  } from 'vue'


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


const playing = ref(false);
const duration = ref(0);
const percentagePlayed = ref(0);
const videoMuted = ref(false);



onMounted(async () => {
    bindEvents();

  if ($refs.player.muted) {
    setMuted(true);
  }
});


const bindEvents = () => {
  EVENTS.forEach((event) => {
    bindVideoEvent(event);
  });
}

const bindVideoEvent= (which)=> {
  const player = $refs.player;

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

      $emit(which, { event, player: this });
    }
  )
}

const play =  () => {
  $refs.player.play();
  setPlaying(true);
}

const pause = () =>  {
  $refs.player.pause();
  setPlaying(false);
}

const togglePlay = () => {
  if (playing) {
    pause();
  } else {
    play();
  }
}

const  setPlaying = (state) =>  {
  playing = state;
}

const seekToPercentage = (percentage) => {
  $refs.player.currentTime = (percentage / 100) * duration;
}

const convertTimeToDuration = (seconds) => {
  return [parseInt((seconds / 60) % 60, 10), parseInt(seconds % 60, 10)]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}

const mute = () => {
  $refs.player.muted = true;
  setMuted(true);
}

const unmute = () => {
  $refs.player.muted = false;
  setMuted(false);
}

const toggleMute = () => {
  if (videoMuted) {
    unmute();
  } else {
    mute();
  }
}

const setMuted = (state) => {
  videoMuted = state;
}

</script>
<style lang="scss" scoped>

video {
    width: 100%;
}
</style>