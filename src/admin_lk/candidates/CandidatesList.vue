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
    </v-row>
    <v-row class="my-2 ml-1">
      <v-btn
        variant="text"
        icon="mdi-plus"
        size="small"
        color="light-green-color"
        @click="onAddCandidate"
      />
      <v-btn
        variant="text"
        icon="mdi-pencil"
        size="small"
        color="light-green-color"
        :disabled="!selectedCandidate"
        @click="onEditCandidate"
      />
      <v-btn
        variant="text"
        icon="mdi-close"
        size="small"
        color="light-green-color"
        :disabled="!selectedCandidate"
        @click="onDeleteCandidate"
      />
      <v-btn
        variant="text"
        icon="mdi-refresh"
        size="small"
        color="light-green-color"
        tooltip="Обновить"
        @click="loadCandidates"
      />
      <v-btn
        variant="text"
        text="Перенести в состав"
        color="light-green-color"
        :disabled="!selectedCandidate"
        @click="transformToMember"
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
        v-for="(candidate, index) in candidates"
        :key="candidate.id"
        class="cursor-pointer"
        :class="getTrClass(candidate)"
        @click="onClickCandidate(candidate)"
      >
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ candidate?.getFullName() }}
        </td>
        <td>
          {{ getBirthdayStr(candidate) }}
        </td>
        <td>
          {{ getInstrumentsStr(candidate) }}
        </td>
      </tr>
      </tbody>
    </v-table>

    <member-form
      :is-window-active="isEditWindowActive"
      :is-candidate
      :model-value="selectedCandidate"
      @submit="onSaveCandidate"
      @close="onCloseForm"
    />
    <confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Member } from '@models/Member';
import { instrumentService } from '@api/service/InstrumentService';
import { universityService } from '@api/service/UniversityService';
import { Instrument } from '@models/Instrument';
import { memberService } from '@api/service/MemberService';
import { getDefaultDateStr } from '@/util/util';
import { University } from '@models/University';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import { ConfirmDialogExpose } from '@/components/dialogs/ConfirmDialogInterface';
import MemberForm from '@/admin_lk/members/MemberForm.vue';

const candidates = ref<Member[]>([]);
const instruments = ref<Instrument[]>([]);
const universities = ref<University[]>([]);
const selectedCandidate = ref<Member | null>(null);

const isEditWindowActive = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const confirmDialog = ref<ConfirmDialogExpose | null>(null);

const filter = ref({
  instruments: [],
  university: null,
});

watch(
  () => [filter.value.instruments, filter.value.university],
  () => loadCandidates()
);

onMounted(async () => {
  window.scrollTo(0, 0);
  instruments.value = await instrumentService.load();
  universities.value = await universityService.load();
  loadCandidates();
});

const loadCandidates = async (): void => {
  selectedCandidate.value = null;
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
  filters.push({
    key: 'isCandidate',
    value: true,
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
      candidates.value = d.map((m: Member) => new Member(m));
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
};

const onAddCandidate = (): void => {
  isEditWindowActive.value = true;
  selectedCandidate.value = new Member();
};

const onEditCandidate = (): void => {
  isEditWindowActive.value = true;
};

const getBirthdayStr = (candidate: Member): string => {
  return getDefaultDateStr(candidate.birthday);
};

const getInstrumentsStr = (candidate: Member): string => {
  return candidate.instruments?.map((mi) => mi.instrument?.name).join(', ');
};

const onClickCandidate = (candidate: Member): void => {
  selectedCandidate.value = new Member(candidate);
};

const getTrClass = (candidate: Member): string => {
  return selectedCandidate.value?.id === candidate.id ? 'active' : '';
};

const onDeleteCandidate = (): void => {
  confirmDialog.value?.open(
    'Вы уверены, что хотите удалить заявку на прослушивание?',
    async () => {
      await memberService.deleteMember(selectedCandidate.value.id);
      loadCandidates();
    },
    null,
  );
};

const transformToMember = (): void => {
  confirmDialog.value?.open(
    `Вы уверены, что хотите утвердить ${selectedCandidate.value.getFullName()}?`,
    async () => {
      selectedCandidate.value.isCandidate = false;
      selectedCandidate.value.isActive = true;
      selectedCandidate.value.joinDate = new Date();
      await memberService.save(selectedCandidate.value).then(() => loadCandidates());
    },
    null,
  );
}

const onSaveCandidate = (): void => {
  loadCandidates();
  onCloseForm();
};

const onCloseForm = (): void => {
  isEditWindowActive.value = false;
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
