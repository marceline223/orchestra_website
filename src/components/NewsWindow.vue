<template>
  <v-dialog
    :model-value="show"
    @update:model-value="onClickClose"
  >
    <h1>
      {{props.newsObject.title}}
    </h1>
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
