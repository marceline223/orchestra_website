<template>
  <div>
    <banner-grid />
    <info-about />
    <info-concerts />
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

