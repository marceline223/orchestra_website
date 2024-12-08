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
    <div class="preview-icon-container">
      <v-btn
        icon="mdi-menu-right"
        variant="tonal"
        color="#6EA06A"
        @click="onClickShowVideo"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "VideoComponent",
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
    }
  },
  methods: {
    onClickShowVideo() {
      console.log('show');
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
