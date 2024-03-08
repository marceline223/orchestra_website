<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <v-app>
    <header-component/>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>
