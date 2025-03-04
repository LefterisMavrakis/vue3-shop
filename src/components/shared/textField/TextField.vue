<template>
  <div class="mainField mainBorder">
    <input
      v-model="inputValue"
      type="text"
      class="mainBorder"
      :placeholder="placeholder ?? 'Enter text...'"
    />

    <template v-if="clearale && inputValue">
      <div class="fieldIcon">
        <IconClose @click="handleClear" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  debounce?: number
  clearale?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = ref(props.modelValue)
let timeout: ReturnType<typeof setTimeout> | null = null

const handleClear = () => {
  inputValue.value = ''
}

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  },
)

watch(inputValue, (newValue) => {
  if (props.debounce) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => emit('update:modelValue', newValue), props.debounce)
  } else {
    emit('update:modelValue', newValue)
  }
})
</script>
