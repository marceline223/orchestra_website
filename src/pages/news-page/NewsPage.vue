<template>

  <div class="page-title">Новости оркестра</div>

  <div v-if="news.length" class="news-grid mt-10">
     <!-- большая карточка --> <news-preview-component
      :news-object="news[0]"
      class="news-item large"
      large
    /> <!-- маленькие --> <news-preview-component
      v-for="newsObj in news.slice(1)"
      :key="newsObj.id"
      :news-object="newsObj"
      class="news-item small"
    />
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NewsPreviewComponent from './NewsPreviewComponent.vue';
import { News } from '@models/News';
import { newsService } from '@api/service/NewsService';

const news: News[] = ref<News[]>([]);

onMounted(async () => {
  window.scrollTo(0, 0);
  news.value = await newsService.getAllNews();
});
</script>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: 50px;
  grid-auto-rows: 400px;
  gap: 50px;
}

.news-item.large {
  grid-column: span 2;
  grid-row: span 2;
}
</style>

