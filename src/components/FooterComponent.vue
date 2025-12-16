<template>
  <v-footer
    class="footer-component"
    color="footer-color"
  >
    <v-row class="justify-space-between align-center footer-row">
      <v-row>
        <v-col class="d-flex flex-column gr-3 pt-5">
          <h6>
            <router-link
              class="green-text text-left"
              to="contacts"
              text="Контакты"
            />
          </h6>
          <h6>
            <router-link
              class="green-text"
              to="contacts"
              text="Для организаторов"
            />
          </h6>
        </v-col>
        <v-col
          class="text-left d-flex flex-column justify-space-around gr-2 pt-5"
        >
          <h6 class="green-text">
            Наши соцсети:
          </h6>
          <div>
            <a
              target="_blank"
              href="https://vk.com/polytech_orchestra"
            >
              <img
                src="../assets/icons/vk.svg"
                width="25"
                class="mr-1"
              >
            </a>
            <a
              target="_blank"
              href="https://t.me/piorchestra"
            >
              <img
                src="../assets/icons/tg.svg"
                width="25"
              >
            </a>
          </div>
        </v-col>
      </v-row>
      <v-col class="d-flex flex-column pt-3">
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

<style lang="scss" scoped>
.footer-component {
  max-height: 105px;
  text-align: left;
  background-color: var(--footer-color);
  padding-bottom: 2em;

  .footer-row {
    width: 80%;
  }
}

.icon-contacts {
  font-size: 20pt;
}
</style>
