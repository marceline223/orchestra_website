<template>
  <v-row>
    <v-col class="d-flex">
      <div class="carousel-btn cursor-pointer">
        <img
          src="../../assets/icons/arrow-left.svg"
          @click="onClickPrev"
        />
      </div>
      <div style="width: 100%" class="mx-2">
        <v-carousel
          v-model="carouselValue"
          cycle
          class="mb-2 carousel-photo"
          hide-delimiters
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(photo) in carouselPhotosSrc"
            :key="photo"
            :src="carouselPhoto"
            cover
            eager
          />
        </v-carousel>
        <router-link
          class="darker-green-text"
          to="gallery"
          text="Смотреть все"
        />
      </div>
      <div class="carousel-btn cursor-pointer">
        <img
          src="../../assets/icons/arrow-right.svg"
          @click="onClickNext"
        />
      </div>
    </v-col>

    <v-col class="text-about darker-green-text pt-5 px-5 ml-10">
      <v-row>
        <v-img
          class="photo-cube mr-3"
          cover
          aspect-ratio="2/1"
          src="/photos/main-page/2.jpg"
        />
        <v-img
          class="photo-cube mr-3"
          cover
          aspect-ratio="2/1"
          src="/photos/main-page/2.jpg"
        />
        <v-img
          class="photo-cube"
          cover
          aspect-ratio="2/1"
          src="/photos/main-page/2.jpg"
        />
      </v-row>
      <v-row>
        <h1 class="green-text thin-header">
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
  font-size: 12pt;
}

.carousel-btn {
  margin-top: 15em;
}
</style>
