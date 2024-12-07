<template>
  <v-col class="banner">
    <v-row align="center">
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(1)"
        />
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(2)"
        />
      </v-col>
      <v-col
          cols="8"
          class="pa-3"
      >
        <h1 class="main-page-text banner-text text-center">
          Оркестр Политеха -
        </h1>
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(3)"
        />
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(4)"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(5)"
        />
      </v-col>
      <v-col
          cols="10"
          class="pa-3"
      >
        <h1 class="main-page-text banner-text">
          это рандомный текст но потом мы что-то придумаем обязательно
        </h1>
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(6)"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(7)"
        />
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(8)"
        />
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(9)"
        />
      </v-col>
      <v-col
          cols="6"
          class="pa-1"
      />
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(10)"
        />
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(11)"
        />
      </v-col>
      <v-col
          cols="1"
          class="pa-1"
      >
        <v-img
            class="photo-cube"
            :width="115"
            aspect-ratio="1/1"
            cover
            :src="getBannerPhotoSrc(12)"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "BannerGrid",
  data() {
    return {
      bannerPhotosSrc: [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg',
        '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'
      ],
      bannerPhotosWay: '/photos/main-page/banner/',
    }
  },
  methods: {
    getBannerPhotoSrc(number) {
      return '/photos/main-page/banner/' + this.bannerPhotosSrc[number - 1];
    }
  }
}
</script>


<style scoped lang="scss">
.banner {
  padding: 60px;
  margin-bottom: 150px;
  margin-top: 50px;
}

.banner-text {
  padding: 0 15px;
}
</style>
