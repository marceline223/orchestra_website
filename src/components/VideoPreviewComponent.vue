<template>
  <div class="preview-container">
    <div class="preview-image-container">
      <img
          class="preview-image"
          :src="previewSrc"
          :width="previewWidth"
          alt="preview image"
      />
    </div>
    <video-watch-component
        :video-width="videoWidth"
        :video-height="videoHeight"
        :video-src="videoSrc"
    />
    <h6 class="video-title green-text">
      {{ videoTitle }}
    </h6>
  </div>
</template>

<script>

import VideoWatchComponent from "./VideoWatchComponent.vue";

export default {
  name: "VideoPreviewComponent",
  components: {VideoWatchComponent},
  props: {
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
      default: 220,
    },
    videoWidth: {
      type: String,
      default: "1080",
    },
    videoHeight: {
      type: String,
      default: "900",
    },
    videoTitle: {
      type: String,
      default: null,
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

.video-title {
  text-wrap: wrap;
  max-width: 220px;
}
</style>
