<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const modelValue = defineModel<string>('modelValue')

const props = defineProps<{
  onBlur: () => void
  class?: string
}>()

const showPasswordMap = ref(false)

const togglePassword = () => {
  showPasswordMap.value = !showPasswordMap.value
}
</script>

<template>
  <div class="relative">
    <Input
      :type="showPasswordMap ? 'text' : 'password'"
      v-model="modelValue"
      @blur="props.onBlur"
      placeholder="Пароль"
      :class="props.class"
    />
    <button
      type="button"
      @click="togglePassword"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
    >
      <Icon
        :icon="showPasswordMap ? 'material-symbols:visibility' : 'material-symbols:visibility-off'"
        width="20"
        height="20"
      />
    </button>
  </div>
</template>
