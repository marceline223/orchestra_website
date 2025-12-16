<template>
  <div>
    <h3>Участники</h3>
    <v-row
      class="my-3 ml-1"
      style="height: 30px"
    >
      <v-combobox
        v-model="filter.instrument"
        style="height: 100%"
        :items="instruments"
        label="Инструмент"
        density="compact"
        item-value="id"
        item-title="name"
        variant="underlined"
        clearable
        @update:model-value="loadMembers"
      />
      <v-checkbox
        v-model="filter.showInactive"
        label="Показывать неактивных"
        @update:model-value="loadMembers"
      />
    </v-row>
    <v-row class="my-2">
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
      v-if="selectedMember"
      :is-window-active="isEditWindowActive"
      :model-value="selectedMember"
      @save="onSaveMember"
      @close="onCloseForm"
    />

    <confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { Member } from '@models/Member';
import { onMounted, ref } from 'vue';
import { memberService } from '@api/service/MemberService';
import { getDefaultDateStr } from '@/util/util';
import MemberForm from '@/admin_lk/members/MemberForm.vue';
import { instrumentService } from '@api/service/InstrumentService';
import { Instrument } from '@models/Instrument';

const instruments = ref<Instrument[]>([]);
const members = ref<Member[]>([]);
const selectedMember = ref<Member | null>(null);

const isEditWindowActive = ref<boolean>(false);
const isLoading = ref<boolean>(false);

interface ConfirmDialogExpose {
  open: () => void;
}
const confirmDialog = ref<ConfirmDialogExpose | null>(null);

const filter = ref({
  instrument: null,
  showInactive: false,
});

onMounted(() => {
  window.scrollTo(0, 0);
  loadInstruments();
  loadMembers();
});

const loadMembers = async (): void => {
  selectedMember.value = null;
  const filters = [];
  if (filter.value.instrument) {
    filters.push({
      key: 'instruments.instrument.id',
      value: filter.value.instrument.id,
      condition: 'contains',
    });
  }
  if (!filter.value.showInactive) {
    filters.push({
      key: 'isActive',
      value: true,
      condition: 'equals',
    });
  }
  isLoading.value = true;
  await memberService
    .load({
      filters,
      sort: [
        {
          key: 'lastName',
        },
      ],
      relations: ['instruments', 'instruments.instrument']
    })
    .then((d: Member[]) => {
      members.value = d.map((m: Member) => new Member(m));
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
};

const loadInstruments = async (): void => {
  instruments.value = await instrumentService.load();
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

const onSaveMember = (): void => {
  loadMembers();
  onCloseForm();
};

const onCloseForm = (): void => {
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
