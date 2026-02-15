<template>
  <v-dialog
    width="800px"
    :model-value="isWindowActive"
    @update:model-value="onClickClose"
  >
    <v-card
      v-if="member"
      :title=formTitle
    >
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            v-model="member.lastName"
            class="pl-1"
            label="Фамилия"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.required, rules.onlyLettersWithHyphen]"
          />
          <v-text-field
            v-model="member.firstName"
            class="pl-1"
            label="Имя"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.required, rules.onlyLettersWithHyphen]"
          />
          <v-row class="px-3 my-1">
            <v-text-field
              ref="surnameTextField"
              v-model="member.surname"
              class="pl-1"
              label="Отчество"
              clearable
              variant="underlined"
              density="comfortable"
              :rules="[rules.surnameRequired, rules.onlyLettersWithHyphen]"
            />
            <v-checkbox
              v-model="isSurnameNotRequired"
              class="ml-1"
              color="light-green-color"
              label="Нет отчества"
              density="comfortable"
              variant="underlined"
              @update:model-value="onClickSurnameCheckbox"
            />
          </v-row>

          <v-row class="pl-4 pr-2 justify-space-between align-center">
            <v-text-field
              v-model="birthday"
              class="date-field"
              label="Дата рождения"
              type="date"
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
            />
            <div class="mb-6 mr-4">Пол:</div>
            <v-radio-group
              v-model="member.gender"
              class="gender-radio"
              density="compact"
              inline
              :rules="[rules.required]"
            >
              <v-radio
                class="mr-5"
                label="Мужской"
                value="M"
              />
              <v-radio
                label="Женский"
                value="F"
              />
            </v-radio-group>
          </v-row>

          <div v-if="!member.isCandidate">
            <v-row class="px-3 gc-4 h-50">
              <v-checkbox
                v-model="member.isActive"
                class="mt-2"
                density="compact"
                label="В составе"
              />
              <div class="mt-4">с</div>
              <v-text-field
                v-model="joinDate"
                class="date-field ml-3"
                type="date"
                variant="underlined"
                density="comfortable"
              />
            </v-row>
            <v-row
              v-if="!member.isActive"
              class="pl-4 pr-2 align-center gc-5"
            >
              <div class="ml-1">
                Дата ухода:
              </div>
              <v-text-field
                v-model="leaveDate"
                class="date-field"
                type="date"
                variant="underlined"
                density="comfortable"
              />
            </v-row>
          </div>
          <v-divider
            class="my-5"
            color="darker-green-text-color"
            :thickness="3"
          />
          <h4>
            Инструменты
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-plus"
              color="light-green-color"
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
              v-if="!member.isCandidate"
              v-model="memberInstrument.position"
              density="compact"
              label="Должность"
              style="height: 100%"
              hide-details
              clearable
              variant="underlined"
            />
            <v-checkbox
              v-if="member.isCandidate"
              v-model="memberInstrument.inStock"
              class="mr-3"
              color="light-green-color"
              label="В наличии"
              density="comfortable"
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
          <v-divider
            class="mt-8 mb-3"
            color="darker-green-text-color"
            :thickness="3"
          />
          <h4 class="my-5">Образование</h4>
          <v-combobox
            v-model="member.degree"
            label="Степень"
            :items="educationDegrees"
            :return-object = false
            item-title="name"
            item-value="key"
            variant="underlined"
            density="compact"
          />
          <v-row class="my-2">
            <v-combobox
              ref="universityCombobox"
              v-model="member.university"
              v-model:search="universitySearch"
              class="mx-3 w-30"
              :label="member.degree === 'SCHOOL' ? 'Школа' : 'ВУЗ'"
              :items="universities"
              :hide-no-data="false"
              item-title="shortName"
              item-value="id"
              variant="underlined"
              density="compact"
            >
              <template #no-data>
                <v-list-item class="ml-1">
                    <span>Значение "{{ universitySearch }}" не найдено. Добавить в список?</span>
                    <v-row class="justify-end mt-2">
                      <v-btn
                        variant="text"
                        icon="mdi-check"
                        size="small"
                        color="light-green-color"
                        @click="onShowUniversityWindow"
                      />

                      <v-btn
                        variant="text"
                        icon="mdi-close"
                        size="small"
                        color="red"
                        @click="clearUniversitySearch"
                      />
                    </v-row>
                </v-list-item>
              </template>
            </v-combobox>
            <v-checkbox
              v-model="member.isGraduated"
              class="mt-2"
              density="compact"
              :label="member.gender === 'F' ? 'Выпускница' : 'Выпускник'"
            />
          </v-row>
          <v-text-field
            v-if="member.degree !== 'SCHOOL'"
            v-model="member.department"
            label="Институт"
            clearable
            variant="underlined"
            density="comfortable"
          />
          <v-text-field
            v-if="member.degree !== 'SCHOOL'"
            v-model="member.group"
            label="Группа"
            clearable
            variant="underlined"
            density="comfortable"
          />
          <v-text-field
            v-model="member.year"
            :label="member.degree === 'SCHOOL' ? 'Класс' : 'Курс'"
            clearable
            variant="underlined"
            density="comfortable"
          />
          <v-divider
            class="mt-8 mb-5"
            color="darker-green-text-color"
            :thickness="3"
          />
          <h4 class="my-3">Контактные данные</h4>
          <v-text-field
            v-model="member.phone"
            label="Телефон"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="member.email"
            label="Почта"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.required]"
          />
          <h5 class="my-3">Обязательно что-то одно:</h5>
          <v-text-field
            ref="linkVKTextField"
            v-model="member.linkVK"
            label="Ссылка на ВК"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.contacts]"
            @update:model-value="validateLinks"
          />
          <v-text-field
            ref="linkTGTextField"
            v-model="member.linkTG"
            label="Ссылка на Telegram"
            clearable
            variant="underlined"
            density="comfortable"
            :rules="[rules.contacts]"
            @update:model-value="validateLinks"
          />
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

    <university-form
      :is-window-active="isUniversityWindowActive"
      :short-name="universitySearch"
      @submit="onSubmitUniversityForm"
      @close="onCloseUniversityForm"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { VCombobox, VTextField } from 'vuetify/components';
import { onMounted, computed, ref, watch, onUnmounted } from 'vue';
import { Member } from '@models/Member';
import { MemberInstrument } from '@models/MemberInstrument';
import { Validator } from '@models/Validator';
import { Instrument } from '@models/Instrument';
import { University } from '@models/University';
import { getDateStrForField } from '@/util/util';
import { memberService } from '@api/service/MemberService';
import { instrumentService } from '@api/service/InstrumentService';
import { universityService } from '@api/service/UniversityService';
import { educationDegrees } from '@models/EducationDegree';
import UniversityForm from '@/admin_lk/members/UniversityForm.vue';

const props = defineProps({
  isWindowActive: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Member, null],
    default: null,
  },
  /**
   * Создание заявки на прослушивание
   */
  isCandidate: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['submit', 'close']);

const member = ref<Member>();
const instruments = ref<Instrument[]>([]);
const universities = ref<University[]>([]);

const isFormValid = ref<boolean>(false);
const surnameTextField = ref<VTextField | null>(null);
const linkTGTextField = ref<VTextField | null>(null);
const linkVKTextField = ref<VTextField | null>(null);
const universityCombobox = ref<VCombobox | null>(null);
const isSurnameNotRequired = ref<boolean>(false);
const universitySearch = ref<string | null>(null);
const isUniversityWindowActive = ref<boolean>(false);

onMounted(async () => {
  instruments.value = await instrumentService.load();
  universities.value = await universityService.load();
  initValue();
});

watch([(): boolean => props.isWindowActive, (): number => props.modelValue?.id], () => {
  initValue();
});

const validateLinks = async (): void => {
  await linkVKTextField.value?.validate();
  await linkTGTextField.value?.validate();
};

const initValue = (): void => {
  member.value = new Member(props.modelValue);
  if (props.isCandidate) {
    member.value.isCandidate = props.isCandidate;
    member.value.isActive = false;
  }
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

const joinDate = computed({
  get: (): string | null =>
    member.value.joinDate ? getDateStrForField(member.value.joinDate) : null,
  set: (val: string): void => {
    member.value.joinDate = val ? new Date(val) : null;
  },
});

const leaveDate = computed({
  get: (): string | null =>
    member.value.leaveDate ? getDateStrForField(member.value.leaveDate) : null,
  set: (val: string): void => {
    member.value.leaveDate = val ? new Date(val) : null;
  },
});

const formTitle = computed(() => {
  return props.isCandidate ? "Новая заявка на прослушивание" :
    (member.value?.hasID() ? "Редактировать оркестранта" : "Новый оркестрант");
})

const onClickClose = (): void => {
  emit('close');
};

const onClickSave = async (): void => {
  if (member.value?.instruments) {
    member.value.instruments = member.value.instruments.map((mi) => ({
      uid: mi.uid,
      memberId: mi.memberId || member.value.id,
      instrumentId: mi.instrument.id || mi.instrumentId,
      instrument: mi.instrument,
      position: mi.position,
      order: mi.order,
    }));
  }
  await memberService.save(member.value).then(() => emit('submit'));
};

const onClickSurnameCheckbox = async (): Promise<void> => {
  member.value.surname = '';
  await surnameTextField.value?.validate();
};

const rules: Record<string, Validator> = {
  required: (value) => !!value || 'Поле обязательно',
  surnameRequired: (value) => isSurnameNotRequired.value || !!value || 'Поле обязательно',
  onlyDigits: (value) => !value || /^[0-9]+$/.test(value) || 'Только цифры',
  onlyLettersWithHyphen: (value) => !value || /^[a-zA-Zа-яёА-ЯЁ /-]+$/.test(value) || 'Только буквы и дефис',
  contacts: () => !!member.value?.linkTG || !!member.value?.linkVK || 'Нужно указать ВК или Telegram',
};

const onAddInstrument = (): void => {
  member.value.instruments.push(new MemberInstrument());
};

const onDeleteInstrument = (memberInstrument: MemberInstrument): void => {
  member.value.instruments = member.value.instruments.filter(
    (mi) => mi.uid !== memberInstrument.uid,
  );
};

const onShowUniversityWindow = (): void => {
  isUniversityWindowActive.value = true;
};

const clearUniversitySearch = async (): void => {
  universitySearch.value = '';
  await universityCombobox.value.reset();
};

const onCloseUniversityForm = (): void => {
  isUniversityWindowActive.value = false;
}

const onSubmitUniversityForm = async (newUniversity: University): void => {
  universities.value = await universityService.load();
  member.value.university = universities.value.find(u => u.shortName === newUniversity.shortName);
  isUniversityWindowActive.value = false;
  isUniversityWindowActive.value = false;
};

onUnmounted(() => {
  emit('close');
});
</script>

<style scoped lang="scss">
h4 {
  font-size: 14pt !important;
}

.v-form {
  margin: auto;
  max-width: 70%;
}

.date-field * {
  width: 150px;
  max-height: 40px !important;
}

.v-checkbox {
  max-height: 40px !important;
}

.gender-radio {
  max-width: 230px;
}
</style>
