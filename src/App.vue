<script setup lang="ts">
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <v-app>
    <header-component/>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
    <footer-component/>
  </v-app>
</template>
