<template>
  <div class="selectField mainBorder">
    <div class="fieldBody">
      <span class="fieldLabel">{{ props.label ?? 'Select' }}</span>

      <div class="selectedItems flex justify-center">
        <span v-for="item in modelValue" :key="item.value" class="selectedItem">
          {{ item.label }} <button @click="removeItem(item)">&times;</button>
        </span>
      </div>
    </div>

    <select name="select-field" v-model="selected" @change="addItem">
      <option disabled value="">Select an option</option>
      <option
        v-for="(option, index) in options"
        :key="`${option.value}_${index}`"
        :value="option"
        :disabled="modelValue.includes(option)"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

type Props = {
  modelValue: Option[];
  label?: string;
  options: Option[];
  multiselect?: boolean;
};

type Option = {
  label: string;
  value: string;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);
const selected = ref<Option | null>();

const addItem = () => {
  if (selected.value && !props.modelValue.some((item) => item.value === selected.value?.value)) {
    if (props.multiselect) {
      emit('update:modelValue', [...props.modelValue, selected.value]);
    } else {
      emit('update:modelValue', [selected.value]);
    }
  }

  selected.value = null;
};

const removeItem = (item: Option) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((i) => i.value !== item.value),
  );
};
</script>

<style scoped lang="scss">
.selectField {
  box-sizing: border-box;
  min-width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--vt-c-divider-light-1);

  .fieldBody {
    display: flex;
    position: absolute;
    align-items: center;
    gap: 10px;
    min-height: 50px;
    z-index: 1;

    .fieldLabel {
      padding: 10px 5px 10px 10px;
      flex-shrink: 0;
      white-space: nowrap;
    }

    .selectedItems {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      .selectedItem {
        font-size: 12px;
        background: var(--muted-bg);
        border: 1px solid var(--vt-c-divider-light-1);
        padding: 1px 8px;
        border-radius: var(--border-radius-6);
        display: flex;
        align-items: center;

        button {
          margin-left: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          padding: 0;
        }
      }
    }
  }

  select {
    position: relative;
    width: 100%;
    border: none;
    background-color: transparent;
    min-height: 50px;
    padding: 0px 10px;
    box-sizing: border-box;

    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>
