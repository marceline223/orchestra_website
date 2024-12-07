<template>
  <div>
    <banner-grid />
    <info-about />
  </div>
</template>

<script>
import BannerGrid from "./BannerGrid.vue";
import InfoAbout from "./InfoAbout.vue";

export default {
  name: "MainPage",
  components: {InfoAbout, BannerGrid},
}
</script>

