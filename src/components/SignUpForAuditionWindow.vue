<template>
  <v-dialog
    :model-value="isWindowActive"
    width="auto"
  >
    <v-card
      max-width="400"
      text="Здесь будет форма записи на прослушивание"
      title="Записаться на прослушивание"
    >
      <template #actions>
        <div class="ms-auto">
          <v-btn
            text="Отмена"
            @click="onClickClose"
          />
          <v-btn
            text="Отправить"
            variant="tonal"
            @click="onClickSave"
          />
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SignUpForAuditionWindow",
  props: {
    isWindowActive: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['close'],
  methods: {
    onClickClose() {
      this.$emit('close');
    },
    onClickSave() {
      console.log('save');
      this.onClickClose();
    }
  }
}
</script>

<style scoped>

</style>
