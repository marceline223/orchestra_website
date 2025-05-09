<template>
  <div
    class="preview-container cursor-pointer"
    @click="isModalShown = true"
  >
    <div class="preview-image-container">
      <img
        class="preview-image"
        :src="props.previewSrc"
        :width="props.previewWidth"
        alt="preview image"
      />
    </div>
    <video-watch-component
      :video-width="props.videoWidth"
      :video-height="props.videoHeight"
      :video-src="props.videoSrc"
      :is-modal-shown="isModalShown"
      @open="isModalShown = true"
      @close="isModalShown = false"
    />
    <h6
      class="video-title green-text text-wrap"
      :style="'max-width: ' + props.previewWidth + 'px'"
    >
      {{ props.videoTitle }}
    </h6>
  </div>
</template>

<script setup lang="ts">
import VideoWatchComponent from "./VideoWatchComponent.vue";
import {ref} from "vue";

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
  previewSrc: {
    type: String,
    default: 'video/preview/no-video.png'
  },
  previewWidth: {
    type: Number,
    default: 250,
  },
  videoWidth: {
    type: String,
    default: '1080',
  },
  videoHeight: {
    type: String,
    default: '900',
  },
  videoTitle: {
    type: String,
    default: null,
  }
})

const isModalShown = ref(false);
</script>

<style scoped lang="scss">
.preview-container {
  display: grid;
  margin: 50px 0;
}

.preview-image {
  border-radius: 2em;
  border: 3px solid #6EA06A;
}

.preview-image-container {
  grid-area: 1 / 1;
}
</style>
