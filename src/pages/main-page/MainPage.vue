<template>
  <div>
    <banner-grid />
    <info-about />
    <info-concerts />
    <h1 class="text-center">
      Хочешь присоединиться?
    </h1>
    <v-btn
      class="main-page-button pa-3"
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

<style lang="scss" scoped>
.main-page-button {
  background-color: #6EA06A;
  color: white;
  text-transform: none;
  font-size: 26pt;
}
</style>
