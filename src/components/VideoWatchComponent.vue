<template>
  <div class="preview-icon-container">
    <v-dialog
        v-model="isModalShown"
        width="auto"
        @close="onClickCloseDialog"
    >
      <v-card
          text="Здесь будет окно просмотра видео"
          title="Просмотр видео"
      >
      </v-card>
    </v-dialog>
    <v-btn
        icon="mdi-menu-right"
        variant="tonal"
        color="#6EA06A"
        @click="isModalShown = true"
    />
  </div>

</template>

<script>
export default {
  name: "VideoWatchComponent",
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
