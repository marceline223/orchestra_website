<template>
  <v-row>
    <v-col>
      <v-row class="my-0 video-row">
        <video-preview-component
          :video-src="videoExamples[0].videoSrc"
          :video-title="videoExamples[0].videoTitle"
          :preview-src="videoExamples[0].previewSrc"
          class="mx-3"
        />
        <video-preview-component
          :video-src="videoExamples[1].videoSrc"
          :video-title="videoExamples[1].videoTitle"
          :preview-src="videoExamples[1].previewSrc"
        />
      </v-row>
      <v-row class="mt-0 mb-8 video-row">
        <video-preview-component
          :video-src="videoExamples[2].videoSrc"
          :video-title="videoExamples[2].videoTitle"
          :preview-src="videoExamples[2].previewSrc"
          class="mx-3"
        />
        <video-preview-component
          :video-src="videoExamples[3].videoSrc"
          :video-title="videoExamples[3].videoTitle"
          :preview-src="videoExamples[3].previewSrc"
        />
      </v-row>
      <router-link
        class="darker-green-text my-0"
        to="/gallery"
        text="Смотреть все"
      />
    </v-col>
    <v-col class="ml-5">
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
import VideoPreviewComponent from "../../components/VideoPreviewComponent.vue";

export default {
  name: "InfoConcerts",
  components: {VideoPreviewComponent},
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
      ],
      videoExamples: [
        {
          id: 0,
          videoSrc: "https://vk.com/video_ext.php?oid=-147503153&id=456239053&hd=4&autoplay=1",
          videoTitle: "К.Дженкинс - Palladio",
          previewSrc: "/photos/main-page/carousel/1.jpg",
        },
        {
          id: 1,
          videoSrc: "https://vk.com/video_ext.php?oid=-147503153&id=456239028&hd=4&autoplay=1",
          videoTitle: "А.Хачатурян - Танец с саблями",
          previewSrc: "/photos/main-page/carousel/2.jpg",
        },
        {
          id: 2,
          videoSrc: "https://vk.com/video_ext.php?oid=-147503153&id=456239031&hd=4&autoplay=1",
          videoTitle: "К.Сен-Санс - Танец вакханок",
          previewSrc: "/photos/main-page/carousel/3.jpg",
        },
        {
          id: 3,
          videoSrc: "https://vk.com/video_ext.php?oid=-147503153&id=456239058&hd=4&autoplay=1",
          videoTitle: "Б.Кондин, О.Кондина - Гимн Политехнического университета",
          previewSrc: "/photos/main-page/carousel/4.jpg",
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
  justify-content: space-around;
}
</style>
