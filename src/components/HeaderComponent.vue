<template>
  <v-app-bar
    color="#6EA06A"
    class="header-app-bar"
  >
    <template #prepend>
      <v-row class="header-icon align-center">
        <div>
          <v-img
              src="logo-white.svg"
              width="45px"
          />
        </div>
        <div>
          <router-link
              to="/"
              class="header-title-text"
              text="Оркестр Политеха"
          />
        </div>
      </v-row>
    </template>
    <v-spacer/>

    <v-btn
      class="header-link"
      text="Запись на прослушивание"
      @click="onClickShowModal"
    />

    <router-link
      to="/news"
      class="header-link"
      text="Новости"
    />

    <router-link
      to="/gallery"
      class="header-link"
      text="Галерея"
    />

    <router-link
      to="/about"
      class="header-link"
      text="О нас"
    />

    <router-link
      to="/contacts"
      class="header-link"
      text="Контакты"
    />
  </v-app-bar>

  <sign-up-for-audition-window
    :is-window-active="isWindowActive"
    @close="isWindowActive = false"
  />
</template>

<script>
import SignUpForAuditionWindow from "./SignUpForAuditionWindow.vue";
export default {
  name: "HeaderComponent",
  components: {SignUpForAuditionWindow},
  data() {
    return {
      isWindowActive: false,
    }
  },
  methods: {
    onClickShowModal() {
      this.isWindowActive = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-link {
    text-decoration: none;
    text-transform: none;
    font-weight: 300;
    font-size: 1.1em;
    color: white;
    margin: 0 15px;
    letter-spacing: 1.5px;
  }

  .header-title-text {
    text-decoration: none;
    line-height: 0.9em;
    color: white;
    font-size: 1.5em;
    display: flex;
    width: 50%;
    text-align: left;
    font-weight: 300;
  }

  .header-icon {
    flex-wrap: wrap;
    gap: 5px;
    margin-left: 100px;
  }
</style>
