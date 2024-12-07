<template>
  <v-row>
    <div class="carousel-btn">
      <v-icon
        icon="mdi-menu-left"
        color="green-darken-2"
        size="x-large"
        @click="onClickPrev"
      />
    </div>
    <v-col cols="6">
      <v-carousel
          v-model="carouselValue"
          cycle
          class="mb-2"
          hide-delimiters
          :show-arrows="false"
      >
          <v-carousel-item
              v-for="(photo) in carouselPhotosSrc"
              :key="photo"
              content-class="carousel-photo"
              selected-class="carousel-photo"
              :src="carouselPhoto"
              cover
          />
      </v-carousel>
      <router-link
          to="/gallery"
          text="Смотреть все"
      />
    </v-col>
    <div class="carousel-btn">
      <v-icon
          icon="mdi-menu-right"
          color="green-darken-2"
          size="x-large"
          @click="onClickNext"
      />
    </div>

    <v-col class="text-about darker-green-text px-15 pt-5">
      <v-row>
        <v-img
            class="photo-cube mr-3"
            cover
            aspect-ratio="2/1"
            width="50px"
            src="/photos/main-page/2.jpg"
        />
        <v-img
            class="photo-cube mr-3"
            cover
            aspect-ratio="2/1"
            width="50px"
            src="/photos/main-page/2.jpg"
        />
        <v-img
            class="photo-cube"
            cover
            aspect-ratio="2/1"
            width="50px"
            src="/photos/main-page/2.jpg"
        />
      </v-row>
      <v-row>
        <h1 class="green-text">
          О нас
        </h1>
        <p class="darker-green-text">
          Свою историю Оркестр Политеха начинает более века назад — еще на заре существования самого Политехнического
          университета в нём был учрежден студенческий оркестр, оркестр инженеров. Но оркестр просуществовал недолго
          ввиду различных исторических причин.
        </p>
        <br>
        <p class="darker-green-text">
          После 100 лет ожидания, в 2013 году, сообщество музыкантов было возрождено под руководством Дмитрия Мисюры,
          и в 2016 году молодой оркестр дал свой первый концерт!
        </p>
        <br>
        <p class="darker-green-text">
          Активность оркестра растет ежегодно, музыканты регулярно дают большие сольные концерты и участвуют в
          совместных концертах с хором Полигимния и Камерным хором. Оркестр неоднократно занимал призовые места в
          различных музыкальных конкурсах, начиная с 2021 года.
        </p>
      </v-row>
     </v-col>
  </v-row>
</template>

<script>
export default {
  name: "InfoAbout",
  data: () => {
    return {
      carouselValue: 0,
      carouselPhotosSrc: [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'
      ],
      carouselPhotosWay: '/photos/main-page/carousel/',
    }
  },
  computed: {
    carouselPhoto() {
      return this.carouselPhotosWay + this.carouselPhotosSrc[this.carouselValue];
    }
  },
  methods: {
    onClickPrev() {
      if (this.carouselValue > 0) {
        this.carouselValue--;
      } else {
        this.carouselValue = this.carouselPhotosSrc.length - 1;
      }
    },
    onClickNext() {
      if (this.carouselValue < this.carouselPhotosSrc.length - 1) {
        this.carouselValue++;
      } else {
        this.carouselValue = 0;
      }
    },
  },
}
</script>

<style lang="scss">
.text-about {
  text-align: justify;
}
.carousel-btn {
  margin-top: 15em;
}
</style>
