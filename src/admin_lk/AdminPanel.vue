<template>
  <div>
    <div class="page-title">
      Панель администраторов
    </div>
    <v-tabs
      v-model="tab"
      color="light-green-color"
      slider-transition="grow"
      grow
    >
      <v-tab
        value="members"
        variant="text"
      >
        Оркестранты
      </v-tab>
      <v-tab
        value="candidates"
        variant="text"
      >
        Заявки на прослушивание
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="members">
        <member-list />
      </v-tabs-window-item>
      <v-tabs-window-item value="candidates">
        <candidates-list />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MemberList from '@/admin_lk/members/MemberList.vue';
import CandidatesList from '@/admin_lk/candidates/CandidatesList.vue';

const tab = ref(null);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped lang="scss">
//:deep(.v-tab-item) {
//  font-size: 8pt !important;
//}
</style>
