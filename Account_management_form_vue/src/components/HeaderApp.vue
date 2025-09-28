<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import type { IAccount } from '@/types/types'
import ToggleTheme from './ToggleTheme.vue'
import Button from './ui/button/Button.vue'
import { Icon } from '@iconify/vue'

const store = useAccountsStore()

const addAccount = () => {
  const empty: IAccount = {
    id: generateId(),
    labels: [],
    labelsRaw: '',
    type: 'Локальная',
    login: '',
    password: null,
  }
  store.add(empty)
}

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
</script>

<template>
  <div class="flex justify-between mb-3">
    <div class="flex items-center gap-2">
      <h2 class="text-lg font-semibold text-gray-600">Учетные записи</h2>
      <Button @click="addAccount" variant="outline" size="icon" class="cursor-pointer">
        <Icon class="h-[1.2rem] w-[1.2rem]" icon="ep:circle-plus" />
      </Button>
    </div>
    <ToggleTheme />
  </div>
</template>
