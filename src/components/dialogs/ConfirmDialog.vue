<template>
  <v-dialog
    v-model="isActive"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="ma-2"> Подтвердите действие </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-btn
          color="grey"
          variant="tonal"
          @click="onCancel"
        >
          Нет
        </v-btn>
        <v-btn
          class="light-green-button"
          variant="elevated"
          @click="onConfirm"
        >
          Да
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isActive = ref(false);
const message = ref('');
let confirmHandler: (() => void) | null = null;
let cancelHandler: (() => void) | null = null;

const open = (
  msg: string,
  onConfirmHandler?: () => void,
  onCancelHandler?: () => void
): void => {
  message.value = msg;
  confirmHandler = onConfirmHandler || null;
  cancelHandler = onCancelHandler || null;
  isActive.value = true;
};

const onConfirm = (): void => {
  isActive.value = false;
  confirmHandler?.();
};

const onCancel = (): void => {
  isActive.value = false;
  cancelHandler?.();
};

defineExpose({ open });
</script>
