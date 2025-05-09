<template>
  <h1 class="mt-5 mb-15">Состав оркестра</h1>

  <div
    v-for="instrument in instruments"
    :key="instrument.id"
  >
    <h2>
      {{ instrument.title }}
    </h2>
    <v-row class="my-5 gc-8">
      <div
        v-for="member in getMembersByInstruments(instrument.id)"
        :key="member.id"
        class="d-flex flex-column align-center justify-start"
      >
        <v-img
          class="rounded-photo"
          :src="photosWay + member.photoSrc"
          width="300px"
          aspect-ratio="1"
          cover
        />
        <div class="mt-1 h-100">
          <h3 class="darker-green-text text-center photo-label lh-small">
            {{ member.name.firstName }}
          </h3>
          <h3 class="darker-green-text text-center photo-label lh-small mb-1">
            {{ member.name.lastName }}
          </h3>
          <div
            v-for="position in member.position"
            class="darker-green-text text-center photo-label lh-small"
          >
            {{ position }}
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script setup>

const photosWay = '/photos/members/'

// TODO: загрузка оркестрантов с сервера
const members = [
  {
    id: 0,
    name: {
      lastName: 'Мисюра',
      firstName: 'Дмитрий',
      surName: 'Владимирович',
    },
    instrument: [{
      id: 0,
      name: 'Дирижер',
      key: 'CONDUCTOR',
    }],
    photoSrc: '2.jpg',
    position: ['Художественный руководитель', 'Главный дирижер'],
  },
  {
    id: 1,
    name: {
      lastName: 'Жуков',
      firstName: 'Павел',
      surName: 'Юрьевич',
    },
    instrument: [{
      id: 0,
      name: 'Дирижер',
      key: 'CONDUCTOR',
    }],
    photoSrc: '1.jpg',
    position: ['Второй дирижер', 'Администратор'],
  },
  {
    id: 2,
    name: {
      lastName: 'Филимонова',
      firstName: 'Дарья',
      surName: 'Александровна',
    },
    instrument: [{
      id: 2,
      name: 'Флейта',
      key: 'FLUTE',
    }],
    photoSrc: '3.jpg',
    position: ['Вторая флейта', 'Администратор'],
  },
  {
    id: 3,
    name: {
      lastName: 'Гузуева',
      firstName: 'Диана',
      surName: 'Алексеевна',
    },
    instrument: [{
      id: 3,
      name: 'Скрипка',
      key: 'STRING',
    }],
    photoSrc: '4.jpg',
    position: ['Концертмейстер', 'Первая скрипка'],
  },
  {
    id: 4,
    name: {
      lastName: 'Максимова',
      firstName: 'Ева',
      surName: 'Александровна',
    },
    instrument: [{
      id: 3,
      name: 'Скрипка',
      key: 'STRING',
    }],
    photoSrc: '5.jpg',
    position: ['Вторая скрипка'],
  },
  {
    id: 5,
    name: {
      lastName: 'Иванов',
      firstName: 'Игорь',
      surName: 'Олегович',
    },
    instrument: [{
      id: 4,
      name: 'Виолончель',
      key: 'CELLO',
    }],
    photoSrc: '1.jpg'
  },
  {
    id: 6,
    name: {
      lastName: 'Осипов',
      firstName: 'Алексей',
      surName: 'Сергеевич',
    },
    instrument: [
      {
        id: 5,
        name: 'Ударные',
        key: 'DRUM',
      },
      {
        id: 1,
        name: 'Солист',
        key: 'VOICE',
      },
    ],
    photoSrc: '1.jpg',
  },
  {
    id: 7,
    name: {
      lastName: 'Виноградов',
      firstName: 'Иван',
      surName: 'Андреевич',
    },
    instrument: [{
      id: 5,
      name: 'Ударные',
      key: 'DRUM',
    }],
    photoSrc: '2.jpg'
  },
]

// TODO: загрузка оркестрантов по инструментам с сервера
const getMembersByInstruments = (instrumentId) => {
  return members.filter((member) =>
    member?.instrument?.find(instrument => instrument.id === instrumentId)
  )
}

const instruments = [
  {
    id: 0,
    name: 'Дирижер',
    key: 'CONDUCTOR',
    title: 'Дирижеры',
  },
  {
    id: 1,
    name: 'Солист',
    key: 'VOICE',
    title: 'Солисты',
  },
  {
    id: 2,
    name: 'Флейта',
    key: 'FLUTE',
    title: 'Флейты',
  },
  {
    id: 3,
    name: 'Скрипка',
    key: 'STRING',
    title: 'Скрипки',
  },
  {
    id: 4,
    name: 'Виолончель',
    key: 'CELLO',
    title: 'Виолончель',
  },
  {
    id: 5,
    name: 'Ударные',
    key: 'DRUM',
    title: 'Ударные',
  },
]
</script>

<style lang="scss" scoped>
.photo-label {
  font-weight: lighter;
}
</style>
