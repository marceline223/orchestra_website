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
        {{ dateStr }}
      </div>
      <p>
        <img
          v-if="newsObject?.photoSrc"
          class="mb-7 mr-5 news-img"
          :src="imageSrc"
          height="400px"
          alt="news photo"
        />
        {{ newsObject.description }}
      </p>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { News } from '@models/News';
import { getLongMonthDateStr } from '@/util/util';

const props = defineProps({
  newsObject: {
    type: Object as PropType<News>,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const dateStr: string = computed(() => {
  return getLongMonthDateStr(props.newsObject?.date);
});

const imageSrc = computed(() => {
  return props.newsObject?.photoSrc
    ? 'photos/news/' + props.newsObject.photoSrc
    : 'default_img.jpg';
});

const onClickClose = (): void => {
  emit('close');
};
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

.news-img {
  float: left;
}
</style>
