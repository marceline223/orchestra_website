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
      to="audition"
      class="header-link"
      text="О прослушиваниях"
    />

    <v-btn
      to="news"
      class="header-link"
      text="Новости"
    />

    <v-btn
      to="gallery"
      class="header-link"
      text="Галерея"
    />

    <v-menu>
      <template #activator="{ props }">
        <v-btn
          class="header-link"
          text="О нас"
          v-bind="props"
        />
      </template>

      <v-list
        class="pa-0"
        variant="plain"
      >
        <v-list-item
          to="members"
          title="Состав оркестра"
          class="darker-green-text"
        />
        <v-list-item
          to="history"
          title="История"
          class="darker-green-text"
        />
      </v-list>
    </v-menu>


    <v-btn
      to="contacts"
      class="header-link"
      text="Контакты"
    />
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header-link {
  text-decoration: none;
  text-transform: none;
  font-weight: 300;
  font-size: 1.1em;
  color: white;
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
