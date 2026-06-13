<template>
  <v-file-input
    class="photo_input mt-3"
    label="Загрузить фотографию"
    accept="image/*"
    density="compact"
    variant="underlined"
    prepend-icon="mdi-camera"
    @update:model-value="onFileChange"
  />
  <v-dialog
    v-model="isWindowActive"
    width="500"
  >
    <v-card class="pa-3">
      <vue-cropper
        ref="cropper"
        :src="imageUrl"
        :aspect-ratio="1"
        :view-mode="1"
      />
      <v-card-actions>
        <v-btn @click="cropImage">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueCropper from 'vue-cropperjs';

const isWindowActive = ref(false);
const imageUrl = ref<string>('');
const cropper = ref();

const emit = defineEmits(['submit']);

const onFileChange = (file: File): void => {
  if (!file) {
    return
  }
  imageUrl.value = URL.createObjectURL(file)
  isWindowActive.value = true
}

const cropImage = (): void => {
  const canvas = cropper.value.getCroppedCanvas({
    width: 500,
    height: 500
  })

  canvas.toBlob((blob: Blob | null) => {
    if (!blob) {
      return
    }

    const formData = new FormData()
    formData.append('file', blob);

    emit('submit', formData);
    isWindowActive.value = false
  }, 'image/jpeg')
}
</script>

<style scoped lang="scss">
@import 'cropperjs/dist/cropper.css';

.photo_input {
  :deep(.v-field-label) {
    font-size: 10pt !important;
  }
}
</style>
