<template>
  <div class="page-title">
    Панель администраторов
  </div>
  <member-list />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MemberList from '@/admin_lk/members/MemberList.vue';

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped lang="scss"></style>
