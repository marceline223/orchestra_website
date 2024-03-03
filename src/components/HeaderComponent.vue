<template>
  <v-app-bar color="#0C6001FF">
    <v-app-bar-title>
      <router-link
          to="/"
          class="header-link v-btn"
          text="Оркестр Политеха"
      />
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <router-link
        to="/"
      class="header-link v-btn"
      text="Запись на прослушивание"
    />

    <router-link
      to="/news"
      class="header-link v-btn"
      text="Новости"
    />

    <router-link
        to="/gallery"
        class="header-link v-btn"
        text="Галерея"
    />

    <router-link
        to="/about"
        class="header-link v-btn"
        text="О нас"
    />

    <router-link
        to="/contacts"
        class="header-link v-btn"
        text="Контакты"
    />
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style lang="scss">
  .header-link {
    text-decoration: none;
    color: white;
    margin: 0 15px;
  }
</style>
