<template>
  <div class="preview-icon-container">
    <v-dialog
        v-model="isModalShown"
        :width="videoWidth"
        :height="videoHeight"
        @close="onClickCloseDialog"
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
    <v-btn
        class="preview-video-button"
        icon="mdi-menu-right"
        @click="isModalShown = true"
    />
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
    onClickCloseDialog() {
      this.isModalShown = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn--variant-elevated {
  color: #6EA06A;
  background-color: white;
}
</style>
