<template>
  <v-dialog
    width="600px"
    :model-value="isWindowActive"
    @update:model-value="onCloseWindow"
  >
    <v-card title="Добавить образовательное учреждение">
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            v-model="newUniversity.name"
            label="Наименование"
            variant="underlined"
            density="comfortable"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="newUniversity.shortName"
            label="Сокращение"
            variant="underlined"
            density="comfortable"
            :rules="[rules.required]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="ms-auto fixed-bottom">
        <v-btn
          text="Отмена"
          @click="onCloseWindow"
        />
        <v-btn
          color="light-green-color"
          text="Сохранить"
          variant="tonal"
          :disabled="!isFormValid"
          @click="onSubmit"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { University } from '@models/University';
import { Validator } from '@models/Validator';
import { VTextField } from 'vuetify/components';
import { universityService } from '@api/service/UniversityService';

const emit = defineEmits(['submit', 'close']);

const props = defineProps({
  isWindowActive: {
    type: Boolean,
    default: false,
  },
  shortName: {
    type: [String, null],
    default: null,
  },
});

const newUniversity = ref<University | null>(null);
const isFormValid = ref<boolean>(false);

const rules: Record<string, Validator> = {
  required: (value) => !!value || 'Поле обязательно',
};

watch(() => props.isWindowActive, () => {
  newUniversity.value = new University();
  newUniversity.value.shortName = props.shortName;
});

const onSubmit = async (): void => {
  await universityService
    .save(newUniversity.value)
    .then(() => emit('submit', newUniversity.value));
}

const onCloseWindow = (): void => {
  emit('close');
}

</script>

<style scoped lang="scss"></style>
