<template>
  <div class="preview-icon-container">
    <v-dialog
      v-model="isModalShown"
      :width="videoWidth"
      :height="videoHeight"
      @close="onCloseDialog"
      @keydown.esc="onCloseDialog"
    >
      <v-card>
        <iframe
          :src="videoSrc"
          :width="videoWidth"
          :height="videoWidth"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          allowfullscreen
        />
      </v-card>
    </v-dialog>
    <img
      class="cursor-pointer"
      src="../assets/icons/play.svg"
      @click="isModalShown = true"
    >
  </div>
</template>

<script>
export default {
  name: "VideoWatchComponent",
  props: {
    videoSrc: {
      type: String,
      required: true,
    },
    videoWidth: {
      type: String,
      required: true,
    },
    videoHeight: {
      type: String,
      required: true,
    }
  },
  emits: ['close'],
  data() {
    return {
      isModalShown: false,
    }
  },
  methods: {
    onCloseDialog() {
      this.isModalShown = false;
    }
  }
}
</script>

<style lang="scss" scoped>

.preview-icon-container {
  grid-area: 1 / 1;
  align-self: center;
}

</style>
