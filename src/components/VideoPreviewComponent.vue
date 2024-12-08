<template>
  <div class="preview-container">
    <div class="preview-image-container">
      <img
          class="preview-image"
          :src="previewSrc"
          :width="width"
          alt="preview image"
      />
    </div>
    <video-watch-component />
  </div>
</template>

<script>

import VideoWatchComponent from "./VideoWatchComponent.vue";

export default {
  name: "VideoPreviewComponent",
  components: {VideoWatchComponent},
  props: {
    src: {
      type: String,
      required: true,
    },
    previewSrc: {
      type: String,
      default: 'video/preview/no-video.png'
    },
    width: {
      type: Number,
      default: 240,
    }
  },
  data() {
    return {
      isModalShown: false,
    }
  },
  methods: {
    onClickShowVideo() {
      this.isModalShown = true;
    }
  }
}

</script>

<style scoped>
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

.preview-icon-container {
  grid-area: 1 / 1;
  align-self: center;
}
</style>
