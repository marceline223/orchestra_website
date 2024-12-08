<template>
  <v-row>
    <v-col>
      <v-row class="my-0 video-row">
        <video-component
            src="https://vk.com/video_ext.php?oid=-147503153&id=456239055"
            class="mx-3"
        />
        <video-component
            src="https://vk.com/video_ext.php?oid=-147503153&id=456239055"
        />
      </v-row>
      <v-row class="mt-0 mb-5 video-row">
        <video-component
            src="https://vk.com/video_ext.php?oid=-147503153&id=456239055"
            class="mx-3"
        />
        <video-component
          src="https://vk.com/video_ext.php?oid=-147503153&id=456239055"
        />
      </v-row>
      <router-link
          class="darker-green-text my-0"
          to="/gallery"
          text="Смотреть все"
      />
    </v-col>
    <v-col>
      <h1 class="mt-10">
        Концерты
      </h1>
      <v-row
          v-for="concert in concerts"
          :key="concert.id"
          class="concert-container"
      >
        <v-col class="green-text">
          {{ concert.date }}
        </v-col>
        <v-col class="green-text">
          {{ concert.name }}
        </v-col>
        <v-col class="green-text">
          {{ concert.placeName }}
        </v-col>
      </v-row>
      <router-link
          class="darker-green-text"
          to="/gallery"
          text="Смотреть все"
      />
    </v-col>
  </v-row>
</template>

<script>
import VideoComponent from "../VideoComponent.vue";

export default {
  name: "InfoConcerts",
  components: {VideoComponent},
  data: () => {
    return {
      concerts: [
        {
          id: 0,
          date: "10 января",
          name: "Концерт1",
          placeName: "Белый зал",
        },
        {
          id: 1,
          date: "16 января",
          name: "Концерт2",
          placeName: "Белый зал",
        }
      ]
    }
  },
}
</script>

<style lang="scss">
.concert-container {
  background-color: #D9F3D0;
  min-height: 3em;
  border: 1px solid #6EA06A;
  border-radius: 1.5em;
  margin: 1.5em 0 !important;
}

.video-row {
  height: 35% !important;
}
</style>
