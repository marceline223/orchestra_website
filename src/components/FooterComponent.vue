<template>
  <v-footer
    class="footer-component"
    color="#D9F3D0"
  >
    <v-row class="justify-space-between align-center footer-row">
      <v-row>
        <v-col class="d-flex flex-column justify-space-between">
          <h6>
            <router-link
              class="green-text text-left"
              to="/contacts"
              text="Контакты"
            />
          </h6>
          <h6>
            <router-link
              class="green-text"
              to="/contacts"
              text="Для организаторов"
            />
          </h6>
        </v-col>
        <v-col
          class="text-left p-0"
        >
          <h6 class="green-text">
            Наши соцсети:
          </h6>
          <a
            target="_blank"
            href="https://vk.com/polytech_orchestra"
          >
            <icon class="fa-brands fa-vk light-green-text icon-contacts"/>
          </a>
          <a
            target="_blank"
            href="https://t.me/piorchestra"
          >
            <icon class="fa-brands fa-telegram light-green-text icon-contacts"/>
          </a>
        </v-col>
      </v-row>
      <v-col>
        <h6 class="green-text">
          Оркестр Политеха
        </h6>
        <h6 class="green-text">
          © 2013 - {{ new Date().getFullYear() }}
        </h6>
        <h6 class="green-text">
          Разработка сайта: Дарья Филимонова, Павел Жуков, Софья Подкорытова
        </h6>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style lang="scss" scoped>
.footer-component {
  max-height: 76px;
  text-align: left;
  background-color: #D9F3D0 !important;
  .footer-row {
    width: 90%;
  }
}

.icon-contacts {
  font-size: 20pt;
}
</style>
