<template>
  <div class="page-title">
    Состав оркестра
  </div>

  <!-- TODO: не показывать инструменты без музыкантов-->
  <div
    v-for="instrument in sortedInstruments()"
    :key="instrument.id"
  >
    <h2>
      {{ instrument.namePlural || instrument.name }}
    </h2>
    <v-row class="my-5 gc-8">
      <div
        v-for="member in getMembersByInstruments(instrument.id)"
        :key="member.id"
        class="d-flex flex-column align-center justify-start mb-3"
      >
        <v-img
          v-if="member.photoSrc"
          class="rounded-photo"
          :src="`${API_URL}/uploads/${member.photoSrc}`"
          width="240px"
          aspect-ratio="1"
          cover
        />
        <v-img
          v-else
          class="rounded-photo"
          width="240px"
          aspect-ratio="1"
          :src="member.gender==='F' ? '/photos/members/not_found_f.jpg' : '/photos/members/not_found_m.jpg'"
          cover
        />
        <div class="mt-1 h-100">
          <h3 class="darker-green-text text-center photo-label lh-small">
            {{ member.firstName }}
          </h3>
          <h3 class="darker-green-text text-center photo-label lh-small mb-1">
            {{ member.lastName }}
          </h3>
          <div
            v-for="(position, index) in getPositionByInstrument(instrument.id, member.id)"
            :key="index"
            class="darker-green-text text-center photo-label lh-small"
          >
            {{ position }}
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">

import {Member} from "@models/Member";
import {Instrument} from "@models/Instrument";
import {MemberInstrument} from "@models/MemberInstrument";
import {instrumentService} from "@api/service/InstrumentService";
import {memberService} from "@api/service/MemberService";
import {ref, onMounted} from "vue";

const API_URL = import.meta.env.VITE_API_URL;

const instruments: Instrument[] = ref<Instrument[]>([]);
const members: Member[] = ref<Member[]>([]);

onMounted(async () => {
  window.scrollTo(0, 0);
  instruments.value = await instrumentService.load();
  members.value = await memberService.load({
    sort: [
      {
        key: 'lastName',
      },
    ],
    relations: ['instruments', 'instruments.instrument']
  }).then((d: Member[]) => {
    members.value = d.map((m: Member) => new Member(m));
  })
});

const sortByOrder = (orderA: number, orderB: number, nameA: string, nameB: string): number => {
  // Сначала сортируем по order
  if (orderA == null && orderB != null) return 1;
  if (orderB == null && orderA != null) return -1;
  if (orderA != null && orderB != null && orderA !== orderB) return orderA - orderB;
  // Затем по имени
  return nameA.localeCompare(nameB);
}

const sortedInstruments = (): Instrument[] => {
  const allInstruments = instruments.value as Instrument[] | undefined;
  return allInstruments.sort((a: Instrument, b: Instrument) => sortByOrder(a.order, b.order, a.name, b.name));
}

const getMembersByInstruments = (instrumentId: number): Member[] => {
  const allMembers = members.value as Member[] | undefined;
  return allMembers
    .filter((member: Member) => member.isActive && member.instruments?.find((i: MemberInstrument) => i.instrument.id === instrumentId))
    .sort((a, b) => {
      const orderA = a.instruments?.find(i => i.instrument.id === instrumentId)?.order;
      const orderB = b.instruments?.find(i => i.instrument.id === instrumentId)?.order;

      return sortByOrder(orderA, orderB, a.lastName + a.firstName, b.lastName + b.firstName);
    });
}

const getPositionByInstrument = (instrumentId: number, memberId: number): string => {
  const allMembers = members.value as Member[] | undefined;
  const instruments = allMembers?.find((member: Member) => member.id === memberId)?.instruments;
  return instruments?.find((i: MemberInstrument) => i.instrument.id === instrumentId).position?.split(',');
}

</script>

<style lang="scss" scoped>
.photo-label {
  font-weight: lighter;
}
</style>
