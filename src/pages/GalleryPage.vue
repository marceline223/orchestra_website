<template>
  <div class="page-title">
    Галерея
  </div>
  <v-row>
    <v-col cols="2">
      <div
        v-for="album in albums"
        :key="album.id"
        class="album cursor-pointer my-5 pa-3"
        :class="currentAlbum?.id == album.id ? 'active' : ''"
        @click="currentAlbum = album"
      >
         {{ album.title }}
      </div>
    </v-col>
    <v-col>
      <div
        v-if="currentAlbum"
        class="gallery my-5"
      >
        <v-img
          v-for="(photoSrc, index) in currentAlbum.photosSrc"
          :key="photoSrc"
          :src="getImageSrc(photoSrc)"
          class="cursor-pointer"
          :class="getPhotoClass(index)"
          cover
          @click="onClickImage(index)"
        />
        <v-dialog
          width="1200px"
          height="1000px"
          :model-value="isImgWindowActive"
          @update:model-value="isImgWindowActive = false"
        >
          <v-card>
            <v-carousel
              v-model="carouselValue"
              class="photo-carousel"
              show-arrows="hover"
              hide-delimiters
            >
              <v-carousel-item
                v-for="photoSrc in currentAlbum.photosSrc"
                :key="photoSrc"
                :src="getImageSrc(photoSrc)"
                cover
              />
            </v-carousel>
            <v-card-text>
              <p> Альбом: {{ currentAlbum.title }} </p>

              <p> Дата публикации: {{ new Date().toLocaleString() }} </p>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Album } from '@models/Album';

const currentAlbum: Album | null = ref(null);
const carouselValue = ref(0);
const isImgWindowActive = ref(false);

const getImageSrc = (src: string): string => {
  const album = currentAlbum.value as Album | undefined;
  return 'photos/gallery/' + album?.path + '/' + src;
};

const onClickImage = (index: number): void => {
  carouselValue.value = index;
  isImgWindowActive.value = true;
};

/*
  Определение размера фотографии (A, B, C, D по убыванию) в соответствии с узором
 */
const getPhotoClass = (index: number): string => {
  const photoPattern: string[] = ['c', 'c', 'a', 'b', 'd', 'd'];

  return photoPattern[index % photoPattern.length];
};

const albums: Album[] = [
  {
    id: 0,
    title: 'Альбом 1',
    path: 'album1',
    photosSrc: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  },
  {
    id: 1,
    title: 'Альбом 2',
    path: 'album2',
    photosSrc: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  },
  {
    id: 2,
    title: 'Альбом 3',
    path: 'album3',
    photosSrc: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  },
];
</script>

<style scoped>
.album {
  border-radius: 8px;
}

.album:hover {
  background-color: var(--hover-color);
}

.album.active {
  background-color: var(--footer-color);
}

.album.active:hover {
  background-color: var(--light-green-color);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 150px;
  gap: 10px;
}

.a {
  grid-column: span 6;
  grid-row: span 3;
}

.b {
  grid-column: span 4;
  grid-row: span 2;
}

.c {
  grid-column: span 3;
  grid-row: span 2;
}

.d {
  grid-column: span 2;
  grid-row: span 1;
}

.photo-carousel {
  height: 100% !important;
}
</style>

