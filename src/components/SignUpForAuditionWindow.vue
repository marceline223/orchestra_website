<template>
  <div>
    <v-scroll-x-transition>
      <v-alert
        :model-value="isAlertShown"
        class="alert-right-corner"
        title="Данные отправлены"
        color="light-green"
        type="success"
      />
    </v-scroll-x-transition>
    <v-dialog
      :model-value="props.isWindowActive"
      width="800px"
      @update:model-value="onClickClose"
    >
      <v-card
        class="overflow-hidden px-2"
        title="Записаться на прослушивание"
        subtitle="После заполнения формы с Вами свяжутся для уточнения деталей и даты"
      >
        <v-divider class="mt-5"/>
        <v-card-text class="overflow-y-auto card-text">
          <v-form v-model="isFormValid">
            <v-text-field
              v-model="form.name.lastName"
              class="my-1"
              label="Фамилия"
              clearable
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
            />
            <v-text-field
              v-model="form.name.firstName"
              class="my-1"
              label="Имя"
              clearable
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
            />
            <v-row class="px-3 my-1">
              <v-text-field
                ref="surnameTextField"
                v-model="form.name.surname"
                :disabled="isSurnameNotRequired"
                label="Отчество"
                clearable
                variant="underlined"
                :rules="[rules.surnameRequired]"
                density="comfortable"
              />
              <v-checkbox
                v-model="isSurnameNotRequired"
                color="light-green"
                label="Нет отчества"
                density="comfortable"
                variant="underlined"
                @update:model-value="onClickSurnameCheckbox()"
              />
            </v-row>
            <v-text-field
              v-model="form.birthday"
              class="my-1 date-field"
              label="Дата рождения"
              type="date"
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
            />

            <v-row class="px-3 my-1">
              <v-text-field
                v-model="form.instrument"
                label="Инструмент"
                variant="underlined"
                :rules="[rules.required]"
                density="comfortable"
                hint="Саксофоны, указывайте также тембр"
              />
              <v-checkbox
                v-model="form.haveInstrument"
                color="light-green"
                label="Инструмент в наличии"
                density="comfortable"
                variant="underlined"
              />
            </v-row>

            <v-radio-group
              v-model="form.typeOfActivity"
              class="my-1 radio-group"
              density="comfortable"
              :rules="[rules.required]"
            >
              <v-radio
                label="Я студент"
                value="student"
              />
              <v-radio
                label="Я выпускник"
                value="graduated"
              />
              <v-radio
                label="Другое"
                value="other"
              />
            </v-radio-group>
            <v-text-field
              v-if="form.typeOfActivity && form.typeOfActivity !== 'other'"
              v-model="form.education.university"
              label="ВУЗ"
              variant="underlined"
              :rules="[rules.required, rules.onlyLetters]"
              density="comfortable"
            />
            <div v-if="form.typeOfActivity === 'student'">
              <v-text-field
                v-model="form.education.department"
                label="Институт"
                variant="underlined"
                :rules="[rules.required, rules.onlyLetters]"
                density="comfortable"
                hint="Вуз и институт - не одно и то же"
              />
              <v-text-field
                v-model="form.education.group"
                label="Группа"
                variant="underlined"
                :rules="[rules.required]"
                density="comfortable"
              />
              <v-text-field
                v-model="form.education.year"
                label="Курс"
                type="number"
                variant="underlined"
                :rules="[rules.required, rules.onlyDigits]"
                density="comfortable"
              />
              <v-combobox
                v-model="form.education.degree"
                label="Степень обучения"
                :items="degrees"
                item-value="key"
                item-title="name"
                density="comfortable"
                variant="underlined"
              />
            </div>

            <v-text-field
              v-model="form.phone"
              label="Телефон"
              type="phone"
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
            />

            <v-text-field
              v-model="form.email"
              label="Почта"
              type="email"
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
            />
            <v-text-field
              v-model="form.link"
              label="ВК или Telegram для оперативной связи"
              variant="underlined"
              :rules="[rules.required]"
              density="comfortable"
              hint="Лучше тг. Если указываете вк, проверьте, что страничка открыта для сообщений!"
              placeholder="@аккаунт_в_тг или vk.com/ваша_страничка"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="ms-auto fixed-bottom">
            <v-btn
              text="Отмена"
              @click="onClickClose"
            />
            <v-btn
              class="light-green-button"
              text="Отправить"
              variant="tonal"
              :disabled="!isFormValid"
              @click="onClickSave"
            />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  isWindowActive: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['close']);

const surnameTextField = ref(null);
const isSurnameNotRequired = ref(false);
const isFormValid = ref(false);
const form = ref({
  name: {
    lastName: '',
      firstName: '',
      surname: '',
  },
  birthday: null,
  instrument: '',
  haveInstrument: false,
  typeOfActivity: null,
  education: {
    university: '',
    department: '',
    group: '',
    year: null,
    degree: null,
  },
  phone: '',
  email: '',
  link: '',
});
const rules = {
  required: value => !!value || 'Поле обязательно',
    surnameRequired: value => isSurnameNotRequired.value || !!value || 'Поле обязательно',
    onlyDigits: value => /^[0-9]+$/.test(value) || 'Только цифры',
    onlyLetters: value => /^[a-zA-Zа-яёА-ЯЁ]+$/.test(value) || 'Только буквы'
};
const isAlertShown = ref(false);
const degrees = [
  {
    id: 0,
    key: 'BACHELOR',
    name: 'Бакалавриат'
  },
  {
    id: 1,
    key: 'SPECIALIST',
    name: 'Специалитет'
  },
  {
    id: 2,
    key: 'MASTER',
    name: 'Магистратура'
  },
  {
    id: 3,
    key: 'POST_GRADUATED',
    name: 'Аспирантура'
  },
]

const onClickClose = () => {
  console.log('close 1');
  emit('close');
}

const onClickSave = () => {
  console.log('save');
  isAlertShown.value = true;
  setTimeout(() => {
    isAlertShown.value = false;
    onClickClose();
  }, 1000);
}

const onClickSurnameCheckbox = () => {
  form.value.name.surname = '';
  surnameTextField.value.validate();
}

</script>

<style lang="scss" scoped>
.radio-group {
  margin-left: -10px !important;
  :deep(.v-selection-control-group) {
    justify-content: space-between;
  }
}

.v-form {
  margin: auto;
  max-width: 70%;
}

.alert-right-corner {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 300px;
  z-index: 2500;
}

.date-field {
  width: 30%;
}

.card-text {
  max-height: 100%;
}
</style>
