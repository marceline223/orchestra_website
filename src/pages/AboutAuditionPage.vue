<template>
  <div>
    <v-row class="mt-15 gc-5">
      <v-col>
        <v-img
          class="rounded-photo"
          cover
          aspect-ratio="1"
          src="/photos/main-page/carousel/2.jpg"
        />
      </v-col>
      <v-col>
        <h1>
          Оркестр Политеха ждёт в свои ряды новых музыкантов
        </h1>
        <p class="text-left">
          Оркестр Политеха ждёт в свои ряды новых музыкантов. Оркестр Политеха ждёт в свои ряды новых музыкантов.
          Оркестр Политеха ждёт в свои ряды новых музыкантов. Оркестр Политеха ждёт в свои ряды новых музыкантов.
          Оркестр Политеха ждёт в свои ряды новых музыкантов. Оркестр Политеха ждёт в свои ряды новых музыкантов.
          Оркестр Политеха ждёт в свои ряды новых музыкантов. Оркестр Политеха ждёт в свои ряды новых музыкантов.
          Оркестр Политеха ждёт в свои ряды новых музыкантов. Оркестр Политеха ждёт в свои ряды новых музыкантов.
          Оркестр Политеха ждёт в свои ряды новых музыкантов. Оркестр Политеха ждёт в свои ряды новых музыкантов.
        </p>
      </v-col>
    </v-row>

    <h2 class="text-center mt-15">
      Хочешь присоединиться?
    </h2>
    <v-btn
      class="main-page-button light-green-button pa-3 mt-5"
      text="Записаться в оркестр"
      width="100%"
      height="100%"
      rounded
      @click="onClickShowModal"
    />

    <sign-up-for-audition-window
      :is-window-active="isWindowActive"
      @close="onClickCloseModal"
    />

    <h2 class="text-center mt-15 mb-5 faq-title darker-green-text">
      FAQ
    </h2>
    <div
      v-for="row in faqData"
      :key="row.id"
      class="darker-green-text text-left mb-5"
    >
      <div
        class="faq-question px-3 d-flex justify-space-between align-center"
        @click="row.isExpanded = !row.isExpanded"
      >
        <div>
          {{ row.question }}
        </div>

        <img
          :src="'../../public/icons/triangle-' + (row.isExpanded ? 'up.svg' : 'down.svg')"
          width="35"
        >
      </div>
      <v-expand-transition>
        <div
          v-if="row.isHtmlStr && row.isExpanded"
          class="faq-answer pa-5 text-left"
          v-html="row.answer"
        />
        <div
          v-else-if="row.isExpanded"
          class="faq-answer pa-5 text-left"
          v-text="row.answer"
        />
      </v-expand-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import SignUpForAuditionWindow from "../components/SignUpForAuditionWindow.vue";

const isWindowActive = ref(false)

const onClickShowModal = () => {
  isWindowActive.value = true;
}

const onClickCloseModal = () => {
  isWindowActive.value = false;
}

const faqData = ref([
  {
    id: 0,
    question: 'У меня нет своего музыкального инструмента, может ли оркестр предоставить его?',
    answer: 'Оркестр может предоставить только ударные и клавишные инструменты, ' +
      'остальные должны быть собственностью оркестранта.',
    isHtmlStr: false,
    isExpanded: false,
  },
  {
    id: 1,
    question: 'Что нужно подготовить к прослушиванию?',
    answer: '<p> К прослушиванию нужно подготовить:' +
      '<ul class="ml-5">' +
      '<li> 1-2 гаммы (без арпеджио и пр., деташе и легато будет достаточно)</li>' +
      '<li> 2 отрывка из муз. произведений: один мелодичный (чтобы показать владение звуком), ' +
      'второй в темпе (чтобы показать технику)</li>' +
      '</ul></p>',
    isHtmlStr: true,
    isExpanded: false,
  },
  {
    id: 2,
    question: 'Вопрос 3',
    answer: 'Ответ 3',
    isHtmlStr: false,
    isExpanded: false,
  },
  {
    id: 3,
    question: 'Вопрос 4',
    answer: 'Ответ 4',
    isHtmlStr: false,
    isExpanded: false,
  },
]);
</script>

<style scoped lang="scss">
.faq-title {
  font-size: 36pt;
  font-weight: bold;
}

.faq-question {
  background-color: #D9F3D0;
  min-height: 3em;
  border: 1px solid #6EA06A;
  border-radius: 1em;
  font-weight: lighter;
  font-size: 16pt;
}

.faq-answer {
  width: 95%;
  border: 1px solid #6EA06A;
  border-top: 0;
  border-radius: 0 0 1em 1em;
  margin: 0 auto;
}
</style>
