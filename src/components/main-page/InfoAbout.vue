<template>
  <v-row>
    <v-col cols="7">
      <v-carousel
          class="mb-2"
          style="align-items: center; align-content: center"
          hide-delimiters
      >
        <v-carousel-item
            src="/photos/main-page/carousel/1.jpg"
            max-width="80%"
            class="mx-auto"
            cover
        />

        <v-carousel-item
            src="/photos/main-page/carousel/2.jpg"
            max-width="80%"
            class="m-auto"
            cover
        />

        <v-carousel-item
            src="/photos/main-page/carousel/3.jpg"
            max-width="80%"
            class="m-auto"
            cover
        />

        <v-carousel-item
            src="/photos/main-page/carousel/4.jpg"
            max-width="80%"
            class="m-auto"
            cover
        />

        <v-carousel-item
            src="/photos/main-page/carousel/5.jpg"
            max-width="80%"
            class="m-auto"
            cover
        />

        <template #prev>
          <v-icon
            class="v-btn"
            icon="mdi-menu-left"
            color="green-darken-2"
          />
        </template>
        <template #next>
          <v-icon
            icon="mdi-menu-right"
            color="green-darken-2"
          />
        </template>
      </v-carousel>
      <router-link
          to="/gallery"
          text="Смотреть все"
      />
    </v-col>

    <v-col class="text-about px-15">
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
        <h1> О нас </h1>
        <p> Свою историю Оркестр Политеха начинает более века назад — еще на заре существования самого Политехнического университета в нём был учрежден студенческий оркестр, оркестр инженеров. Но оркестр просуществовал недолго ввиду различных исторических причин.</p>
        <br>
        <p> После 100 лет ожидания, в 2013 году, сообщество музыкантов было возрождено под руководством Дмитрия Мисюры, и в 2016 году молодой оркестр дал свой первый концерт!</p>
        <br>
        <p> Активность оркестра растет ежегодно, музыканты регулярно дают большие сольные концерты и участвуют в совместных концертах с хором Полигимния и Камерным хором. Оркестр неоднократно занимал призовые места в различных музыкальных конкурсах, начиная с 2021 года. </p>
      </v-row>
     </v-col>
  </v-row>

</template>

<script>
export default {
  name: "InfoAbout"
}
</script>

<style lang="scss">
.text-about {
  text-align: justify;
}

.margin-auto {
  margin: auto;
}

.v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 80%;
  .v-img {
    margin: auto !important;
  }
}
</style>
