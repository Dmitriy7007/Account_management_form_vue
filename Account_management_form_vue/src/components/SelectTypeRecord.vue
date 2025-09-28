<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AccountType } from '@/types/types'
import type { AcceptableValue } from 'reka-ui'

const props = defineProps<{ modelValue: AccountType | null }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: AccountType | null): void }>()

const onChange = (value: AcceptableValue) => {
  if (value === 'Локальная' || value === 'LDAP') {
    emit('update:modelValue', value)
  } else {
    emit('update:modelValue', null)
  }
}
</script>

<template>
  <Select :model-value="props.modelValue" @update:model-value="onChange">
    <SelectTrigger class="w-full max-w-[180px]">
      <SelectValue placeholder="Выберите тип" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="Локальная">Локальная</SelectItem>
        <SelectItem value="LDAP">LDAP</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
