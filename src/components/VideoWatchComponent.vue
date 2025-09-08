<template>
  <div class="preview-icon-container">
    <v-dialog
      :model-value="isModalShown"
      :width="props.videoWidth"
      :height="props.videoHeight"
      @close="onCloseDialog"
      @keydown.esc="onCloseDialog"
    >
      <v-card>
        <iframe
          :src="props.videoSrc"
          :width="props.videoWidth"
          :height="props.videoWidth"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          allowfullscreen
        />
      </v-card>
    </v-dialog>
    <img
      class="cursor-pointer"
      src="../assets/icons/play.svg"
      alt=">"
      @click="onOpenDialog"
    />
  </div>
</template>

<script setup lang="ts">
  /**
   * Иконка play поверх картинки превью, открывает модальное окно просмотра со встроенным ВК-плеером
   */
  const emit = defineEmits(['open', 'close']);
  const props = defineProps({
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
    },
    isModalShown: {
      type: Boolean,
      required: true,
    },
  });

  const onOpenDialog = (): void => {
    emit('open');
  };

  const onCloseDialog = (): void => {
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .preview-icon-container {
    grid-area: 1 / 1;
    align-self: center;
  }
</style>
