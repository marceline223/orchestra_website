<template>
  <v-dialog
    :model-value="show"
    width="1200px"
    @update:model-value="onClickClose"
  >
    <v-card>
      <v-card-text class="h2 text-center">
        {{ newsObject.title }}
      </v-card-text>
      <!-- Если есть картинка, текст её обтекает -->
      <p v-if="newsObject?.photoSrc">
        <img
          class="mx-7 mb-7"
          :src="newsObject.photoSrc"
          height="400px"
          alt="news photo"
          align="left"
        />
        {{newsObject.description}}
      </p>

      <v-card-text v-else>
        {{newsObject.description}}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {News} from "@models/News";

const props = defineProps({
  newsObject: {
    type: Object as PropType<News>,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['close']);

const onClickClose = (): void => {
  emit('close');
}

</script>

<style scoped lang="scss">
.card-title {
  font-size: 36pt !important;
}
</style>
