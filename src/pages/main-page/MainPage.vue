<template>
  <div>
    <banner-grid />
    <info-about />
    <info-concerts />
    <h2 class="text-center">
      Хочешь присоединиться?
    </h2>
    <v-btn
      class="main-page-button light-green-button pa-3 mt-5"
      text="Записаться в оркестр"
      width="100%"
      height="100%"
      rounded
      @click="isWindowActive = true"
    />
    <sign-up-for-audition-window
      :is-window-active="isWindowActive"
      @close="isWindowActive = false"
    />
  </div>
</template>

<script>
import BannerGrid from "./BannerGrid.vue";
import InfoAbout from "./InfoAbout.vue";
import InfoConcerts from "./InfoConcerts.vue"
import SignUpForAuditionWindow from "../../components/SignUpForAuditionWindow.vue";

export default {
  name: "MainPage",
  components: {InfoAbout, BannerGrid, InfoConcerts, SignUpForAuditionWindow},
  data() {
    return {
      isWindowActive: false,
    }
  },
}
</script>
