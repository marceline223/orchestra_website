<template>
  <div>
    <v-row
      class="my-3 mx-1 ga-5"
      style="height: 30px"
    >
      <v-combobox
        v-model="filter.instruments"
        style="height: 100%"
        :items="instruments"
        label="Инструмент"
        density="compact"
        item-value="id"
        item-title="name"
        variant="underlined"
        multiple
        clearable
      />
      <v-combobox
        v-model="filter.university"
        style="height: 100%"
        :items="universities"
        label="ВУЗ"
        density="compact"
        item-value="id"
        item-title="shortName"
        variant="underlined"
        clearable
      />
      <v-checkbox
        v-model="filter.showInactive"
        label="Показывать неактивных"
      />
    </v-row>
    <v-row class="my-2 ml-1">
      <v-btn
        variant="text"
        icon="mdi-plus"
        size="small"
        color="light-green-color"
        @click="onAddMember"
      />
      <v-btn
        variant="text"
        icon="mdi-pencil"
        size="small"
        color="light-green-color"
        :disabled="!selectedMember"
        @click="onEditMember"
      />
      <v-btn
        variant="text"
        icon="mdi-close"
        size="small"
        color="light-green-color"
        :disabled="!selectedMember"
        @click="onDeleteMember"
      />
      <v-btn
        variant="text"
        icon="mdi-refresh"
        size="small"
        color="light-green-color"
        tooltip="Обновить"
        @click="loadMembers"
      />
    </v-row>
    <v-table
      density="compact"
      fixed-header
      height="400px"
      :loading="isLoading"
    >
      <thead>
        <tr>
          <th class="text-center">№</th>
          <th class="text-center">ФИО</th>
          <th class="text-center">Дата рождения</th>
          <th class="text-center">Инструмент</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(member, index) in members"
          :key="member.id"
          class="cursor-pointer"
          :class="getTrClass(member)"
          @click="onClickMember(member)"
          @dblclick="onEditMember"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ member?.getFullName() }}
          </td>
          <td>
            {{ getBirthdayStr(member) }}
          </td>
          <td>
            {{ getInstrumentsStr(member) }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <member-form
      :is-window-active="isEditWindowActive"
      :model-value="selectedMember"
      @submit="onCloseForm"
      @close="onCloseForm"
    />

    <confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getDefaultDateStr } from '@/util/util';
import { instrumentService } from '@api/service/InstrumentService';
import { universityService } from '@api/service/UniversityService';
import { memberService } from '@api/service/MemberService';
import { Instrument } from '@models/Instrument';
import { University } from '@models/University';
import { Member } from '@models/Member';
import MemberForm from '@/components/MemberForm.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import { ConfirmDialogExpose } from '@/components/dialogs/ConfirmDialogInterface';

const instruments = ref<Instrument[]>([]);
const universities = ref<University[]>([]);
const members = ref<Member[]>([]);
const selectedMember = ref<Member | null>(null);

const isEditWindowActive = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const confirmDialog = ref<ConfirmDialogExpose | null>(null);

const filter = ref({
  instruments: [],
  university: null,
  showInactive: false,
});

onMounted(async () => {
  window.scrollTo(0, 0);
  instruments.value = await instrumentService.load();
  universities.value = await universityService.load();
  loadMembers();
});

watch(
  () => [filter.value.instruments, filter.value.showInactive, filter.value.university],
  () => loadMembers()
);

const loadMembers = async (): void => {
  selectedMember.value = null;
  const filters = [];
  if (filter.value.instruments.length) {
    filters.push({
      key: 'instruments.instrument.id',
      value: filter.value.instruments.map((i: Instrument ) => i.id),
      condition: 'in',
    });
  }
  if (filter.value.university) {
    filters.push({
      key: 'university.id',
      value: filter.value.university.id,
      condition: 'equals',
    });
  }
  if (!filter.value.showInactive) {
    filters.push({
      key: 'isActive',
      value: true,
      condition: 'equals',
    });
  }
  filters.push({
    key: 'isCandidate',
    value: false,
    condition: 'equals',
  });
  isLoading.value = true;
  await memberService
    .load({
      filters,
      sort: [
        {
          key: 'lastName',
        },
      ],
      relations: ['instruments', 'instruments.instrument', 'university']
    })
    .then((d: Member[]) => {
      members.value = d.map((m: Member) => new Member(m));
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
};

const onAddMember = (): void => {
  isEditWindowActive.value = true;
  selectedMember.value = new Member();
};

const onEditMember = (): void => {
  isEditWindowActive.value = true;
};

const onClickMember = (member: Member): void => {
  selectedMember.value = new Member(member);
};

const onCloseForm = (): void => {
  loadMembers();
  isEditWindowActive.value = false;
};

const onDeleteMember = (): void => {
  confirmDialog.value?.open(
    'Вы уверены, что хотите удалить участника?',
    async () => {
      await memberService.deleteMember(selectedMember.value.id);
      loadMembers();
    },
    null,
  );
};

const getBirthdayStr = (member: Member): string => {
  return getDefaultDateStr(member.birthday);
};

const getInstrumentsStr = (member: Member): string => {
  return member.instruments?.map((mi) => mi.instrument?.name).join(', ');
};

const getTrClass = (member: Member): string => {
  return selectedMember.value?.id === member.id ? 'active' : '';
};
</script>

<style scoped lang="scss">
th {
  background-color: var(--light-green-color) !important;
}

tr:hover {
  background-color: var(--hover-color);
}

tr.active {
  background-color: var(--active-color);
}

tr.active:hover {
  background-color: var(--active-hover-color);
}
</style>
