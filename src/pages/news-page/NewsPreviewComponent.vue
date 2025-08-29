<template>
  <v-card
    :class="props.large ? 'news-card large-card' : 'news-card small-card'"
    flat
    @click="onShowNewsWindow"
  >
    <v-img
      class="news-image"
      :src="props.newsObject.photoSrc || 'default_img.jpg'"
      cover
      :height="large ? 400 : 150"
    />
    <v-card-text class="card-title">
      {{ title }}
    </v-card-text>
    <div class="date-container ml-4">
      {{ props.newsObject.date.toLocaleDateString('default', {day: 'numeric', month: 'long', year: "numeric"}) }}
    </div>
    <v-card-text class="card-text text-left green-text font-weight-light pb-0">
      {{ description }}
    </v-card-text>
    <a @click="onShowNewsWindow">
      Смотреть подробнее
    </a>
    <news-window
      :news-object="newsObject"
      :show="isNewsWindowShown"
      @close="onCloseNewsWindow"
    />
  </v-card>
</template>

<script setup lang="ts">
/**
 * Компонент сжатой информации о событии, по клику открывает окно просмотра полной информации {@link NewsWindow}
 */

import NewsWindow from "./NewsWindow.vue";
import {News} from "@models/News";
import {computed, PropType, ref} from "vue";

const props = defineProps({
  newsObject: {
    type: Object as PropType<News>,
    required: true,
  },
  /**
   * Размер карточки
   */
  large: {
    type: Boolean,
    default: false,
  }
});

/*
  Сколько символов будет вмещать описание и заголовок на маленьких и большой карточках
 */
const maxDescriptionLengthSmallCard: number = 120;
const maxDescriptionLengthLargeCard: number = 500;
const maxTitleLengthSmallCard: number = 60;
const maxTitleLengthLargeCard: number = 100;

const isNewsWindowShown = ref(false);

const description: string = computed(() => {
  return trimStr(props.newsObject.description, props.large ? maxDescriptionLengthLargeCard : maxDescriptionLengthSmallCard);
});

const title: string = computed(() => {
  return trimStr(props.newsObject.title, props.large ? maxTitleLengthLargeCard : maxTitleLengthSmallCard);
});

const trimStr = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length - 3) + '...' : str;
}

const onShowNewsWindow = (): void => {
  isNewsWindowShown.value = true;
}

const onCloseNewsWindow = (): void => {
  isNewsWindowShown.value = false;
}
</script>

<style scoped lang="scss">
.news-card {
  border: 1px solid var(--light-green-color);
  border-radius: 35px;
}

.large-card {
  .card-title {
    font-size: 26pt;
  }

  .card-text {
    font-size: 12pt;
  }

  .date-container {
    height: 35px;
    font-size: 12pt;
    max-width: 200px;
    border-radius: 8px;
  }
}

.small-card {
  .card-title {
    font-size: 13pt;
  }

  .card-text {
    font-size: 9pt;
  }

  .date-container {
    height: 17px;
    font-size: 8pt;
    max-width: 120px;
    border-radius: 4px;
  }

  a {
    font-size: 8pt;
  }
}

a {
  color: var(--darker-green-text-color);
  text-decoration: underline;
}

.card-title {
  color: var(--green-text-color);
  font-weight: lighter;
  text-align: left;
}
</style>
