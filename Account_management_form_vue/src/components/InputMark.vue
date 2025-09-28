<script setup lang="ts">
import { Input } from '@/components/ui/input'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'

const modelValue = defineModel<string>('modelValue')

const props = defineProps<{
  onBlur: () => void
  class?: string
}>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Input
          v-model="modelValue"
          @blur="props.onBlur"
          placeholder="Значение"
          :class="props.class"
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
