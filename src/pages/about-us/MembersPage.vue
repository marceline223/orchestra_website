<template>
  <h1 class="mt-5 mb-15">Состав оркестра</h1>

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
          class="rounded-photo"
          :src="photosWay + member.photoSrc"
          width="240px"
          aspect-ratio="1"
          cover
        >
          <template #error>
            <v-img
              width="300px"
              src="not_found.jpg"
              cover
            ></v-img>
          </template>
        </v-img>
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
import { instrumentService } from "@api/service/InstrumentService";
import { memberService } from "@api/service/MemberService";
import {ref, onMounted} from "vue";

const photosWay = '/photos/members/'

const instruments: Instrument[] = ref<Instrument[]>([]);
const members: Member[] = ref<Member[]>([]);

onMounted(async () => {
  window.scrollTo(0, 0);
  instruments.value = await instrumentService.getInstruments();
  members.value = await memberService.getMembers();
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
    .filter((member: Member) => member.instruments?.find((i: MemberInstrument) => i.instrument.id === instrumentId))
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
