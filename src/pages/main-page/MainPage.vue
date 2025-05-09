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
      text="О прослушиваниях"
      width="100%"
      height="100%"
      rounded
      to="audition"
    />
  </div>
</template>

<script>
import BannerGrid from "./BannerGrid.vue";
import InfoAbout from "./InfoAbout.vue";
import InfoConcerts from "./InfoConcerts.vue"
export default {
  name: "MainPage",
  components: {InfoAbout, BannerGrid, InfoConcerts},
}
</script>
