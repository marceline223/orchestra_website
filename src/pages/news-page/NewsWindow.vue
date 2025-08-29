<template>
  <v-dialog
    :model-value="show"
    width="800px"
    @update:model-value="onClickClose"
  >
    <v-card
      :title="props.newsObject.title"
    >
      <v-card-text>
        {{props.newsObject.description}}
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
</style>
