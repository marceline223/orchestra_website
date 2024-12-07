<template>
  <v-app-bar color="#6EA06A">
    <v-app-bar-title>
      <router-link
        to="/"
        class="header-link v-btn"
        text="Оркестр Политеха"
      />
    </v-app-bar-title>

    <v-spacer/>

    <v-btn
      class="header-link v-btn"
      text="Запись на прослушивание"
      @click="onClickShowModal"
    />

    <v-btn
      to="/news"
      class="header-link v-btn"
      text="Новости"
    />

    <v-btn
      to="/gallery"
      class="header-link v-btn"
      text="Галерея"
    />

    <v-btn
      to="/about"
      class="header-link v-btn"
      text="О нас"
    />

    <v-btn
      to="/contacts"
      class="header-link v-btn"
      text="Контакты"
    />
  </v-app-bar>

  <v-dialog
      v-model="isModalShown"
      width="auto"
  >
    <v-card
        max-width="400"
        text="Здесь будет форма записи на прослушивание"
        title="Записаться на прослушивание"
    >
      <template #actions>
        <div class="ms-auto">
          <v-btn
              text="Отмена"
              @click="isModalShown = false"
          />
          <v-btn
              text="Отправить"
              variant="tonal"
              @click="isModalShown = false"
          />
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isModalShown: false,
    }
  },
  methods: {
    onClickShowModal() {
      this.isModalShown = true;
    }
  }
}
</script>

<style lang="scss">
  .header-link {
    text-decoration: none;
    color: white;
    margin: 0 15px;
  }
</style>
