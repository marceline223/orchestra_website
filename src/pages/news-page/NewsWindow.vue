<template>
  <v-dialog
    :model-value="show"
    width="1000px"
    @update:model-value="onClickClose"
  >
    <v-card class="pa-5">
      <div class="h2">
        {{ newsObject.title }}
      </div>
      <div class="date-container text-center my-3 mb-5">
        {{ props.newsObject.date.toLocaleDateString('default', {day: 'numeric', month: 'long', year: "numeric"}) }}
      </div>
      <!-- Если есть картинка, текст её обтекает -->
      <p v-if="newsObject?.photoSrc">
        <img
          class="mb-7 mr-5"
          :src="newsObject.photoSrc"
          height="400px"
          alt="news photo"
          align="left"
        />
        {{ newsObject.description }}
      </p>

      <p v-else>
        {{ newsObject.description }}
      </p>
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

.date-container {
  max-width: 200px;
  border-radius: 8px;
  text-align: center;
}
</style>
