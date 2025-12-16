<template>
  <v-dialog
    width="800px"
    :model-value="props.isWindowActive"
    @update:model-value="onClickClose"
  >
    <v-card
      v-if="member"
      :title="member?.id === null ? 'Новый оркестрант' : 'Редактировать оркестранта'"
    >
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            v-model="member.lastName"
            class="my-1"
            label="Фамилия"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.required, rules.onlyLetters]"
          />
          <v-text-field
            v-model="member.firstName"
            class="my-1"
            label="Имя"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.required, rules.onlyLetters]"
          />
          <v-row class="px-3 my-1">
            <v-text-field
              ref="surnameTextField"
              v-model="member.surname"
              class="my-1"
              label="Отчество"
              clearable
              variant="underlined"
              density="comfortable"
              :rules="[rules.surnameRequired, rules.onlyLetters]"
            />
            <v-checkbox
              v-model="isSurnameNotRequired"
              color="light-green-color"
              label="Нет отчества"
              density="comfortable"
              variant="underlined"
              @update:model-value="onClickSurnameCheckbox"
            />
          </v-row>
          <v-text-field
            v-model="birthday"
            class="my-1 date-field"
            label="Дата рождения"
            type="date"
            variant="underlined"
            :rules="[rules.required]"
            density="comfortable"
          />
          <v-checkbox
            v-model="member.isActive"
            density="compact"
            label=" В составе"
          />
          <v-divider class="my-5" />
          <h4>
            Инструменты
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-plus"
              @click="onAddInstrument"
            />
          </h4>
          <v-row
            v-for="memberInstrument in member.instruments"
            :key="memberInstrument.id"
            class="my-5"
            style="height: 30px"
          >
            <v-combobox
              v-model="memberInstrument.instrument"
              class="mx-3 w-30"
              label="Инструмент"
              :items="instruments"
              item-value="id"
              item-title="name"
              variant="underlined"
              :rules="[rules.required]"
              density="compact"
            />
            <v-text-field
              v-model="memberInstrument.position"
              density="compact"
              label="Должность"
              style="height: 100%"
              hide-details
              clearable
              variant="underlined"
            />
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-close"
              color="red"
              class="align-self-center"
              @click="onDeleteInstrument(memberInstrument)"
            />
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="ms-auto fixed-bottom">
        <v-btn
          text="Отмена"
          @click="onClickClose"
        />
        <v-btn
          color="light-green-color"
          text="Сохранить"
          :disabled="!isFormValid"
          variant="tonal"
          @click="onClickSave"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { VTextField } from 'vuetify/components';
import { onMounted, computed, ref, watch } from 'vue';
import { memberService } from '@api/service/MemberService';
import { Member } from '@models/Member';
import { MemberInstrument } from '@models/MemberInstrument';
import { Validator } from '@models/Validator';
import { getDateStrForField } from '@/util/util';
import { Instrument } from '@models/Instrument';
import { instrumentService } from '@api/service/InstrumentService';

const props = defineProps({
  isWindowActive: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Member,
    required: true,
  },
});
const emit = defineEmits(['save', 'close']);

const member = ref<Member>();
const instruments = ref<Instrument[]>([]);
const isFormValid = ref<boolean>(false);
const surnameTextField = ref<VTextField | null>(null);
const isSurnameNotRequired = ref<boolean>(false);

onMounted(async () => {
  instruments.value = await instrumentService.load();
  initValue();
});

watch([(): boolean => props.isWindowActive, (): number => props.modelValue?.id], () => {
  initValue();
});

const initValue = (): void => {
  member.value = new Member(props.modelValue);
  isSurnameNotRequired.value = member.value.hasID() && !member.value.surname;
  if (!props.modelValue?.hasID()) {
    member.value.isActive = true;
  }
};

const birthday = computed({
  get: (): string | null =>
    member.value.birthday ? getDateStrForField(member.value.birthday) : null,
  set: (val: string): void => {
    member.value.birthday = val ? new Date(val) : null;
  },
});

const onClickClose = (): void => {
  emit('close');
};

const onClickSave = async (): void => {
  if (member.value?.instruments) {
    member.value.instruments = member.value.instruments.map(mi => ({
      uid: mi.uid,
      memberId: mi.memberId || member.value.id,
      instrumentId: mi.instrument.id || mi.instrumentId,
      instrument: mi.instrument,
      position: mi.position,
      order: mi.order
    }));
  }
  await memberService.saveMember(member.value).then(() => emit('save'));
};

const onClickSurnameCheckbox = async (): Promise<void> => {
  member.value.surname = '';
  await surnameTextField.value?.validate();
};

const rules: Record<string, Validator> = {
  required: (value) => !!value || 'Поле обязательно',
  surnameRequired: (value) => isSurnameNotRequired.value || !!value || 'Поле обязательно',
  onlyDigits: (value) => !value || /^[0-9]+$/.test(value) || 'Только цифры',
  onlyLetters: (value) => !value || /^[a-zA-Zа-яёА-ЯЁ ]+$/.test(value) || 'Только буквы',
};

const onAddInstrument = (): void => {
  member.value.instruments.push(new MemberInstrument());
};

const onDeleteInstrument = (memberInstrument: MemberInstrument): void => {
  member.value.instruments = member.value.instruments.filter(
    (mi) => mi.uid !== memberInstrument.uid,
  );
};
</script>

<style scoped lang="scss">
.v-form {
  margin: auto;
  max-width: 70%;
}
</style>
