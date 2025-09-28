<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { parseLabels } from '../utils/labels'
import { Icon } from '@iconify/vue'
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useAccountsStore } from '@/stores/accounts'
import type { AccountType, IAccount } from '@/types/types'
import SelectTypeRecord from './SelectTypeRecord.vue'
import InputMark from './InputMark.vue'
import { headlines, recordTypes } from '@/consts/consts'
import { validateLabels, validateLogin, validatePassword } from '@/utils/validation'

const store = useAccountsStore()

onMounted(() => store.load())

const removeAccount = (id: string) => {
  store.remove(id)
}

const saveAccount = (account: IAccount) => {
  store.update(account)
}

const errorsMap = ref<Record<string, { login?: boolean; password?: boolean; labelsRaw?: boolean }>>(
  {},
)

const onBlur = (acc: IAccount) => {
  acc.labels = parseLabels(acc.labelsRaw)

  errorsMap.value[acc.id] = {
    labelsRaw: !validateLabels(acc.labelsRaw),
    login: !validateLogin(acc.login),
    password: acc.type === recordTypes[1] ? false : !validatePassword(acc.password, acc.type),
  }

  if (acc.type === recordTypes[1]) acc.password = null
  saveAccount(acc)
}

const onTypeChange = (acc: IAccount, value: AccountType | null) => {
  acc.type = value
  if (value === recordTypes[1]) acc.password = null
  saveAccount(acc)
}

const showPasswordMap = ref<Record<string, boolean>>({})

const togglePassword = (id: string) => {
  showPasswordMap.value[id] = !showPasswordMap.value[id]
}

watchEffect(() => {
  store.accounts.forEach((acc) => {
    errorsMap.value[acc.id] = {
      labelsRaw: !validateLabels(acc.labelsRaw),
      login: !validateLogin(acc.login),
      password: !validatePassword(acc.password, acc.type),
    }
  })
})
</script>

<template>
  <div class="shadow rounded p-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="(item, i) in headlines" :key="i">{{ item }}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="acc in store.accounts" :key="acc.id">
          <!-- Метки -->
          <TableCell>
            <InputMark
              v-model="acc.labelsRaw"
              @blur="() => onBlur(acc)"
              :class="errorsMap[acc.id]?.labelsRaw ? 'border-red-500' : ''"
            />
          </TableCell>

          <!-- Тип записи -->
          <TableCell>
            <SelectTypeRecord
              v-model="acc.type"
              @update:modelValue="(value) => onTypeChange(acc, value)"
              class="border-red-500"
            />
          </TableCell>

          <!-- Логин -->
          <TableCell :colspan="acc.type === recordTypes[1] ? 2 : 1">
            <Input
              v-model="acc.login"
              @blur="() => onBlur(acc)"
              placeholder="Логин"
              :class="errorsMap[acc.id]?.login ? 'border-red-500' : ''"
            />
          </TableCell>

          <!-- Пароль -->
          <TableCell v-if="acc.type === recordTypes[0]">
            <div class="relative">
              <Input
                :type="showPasswordMap[acc.id] ? 'text' : 'password'"
                v-model="acc.password"
                @blur="() => onBlur(acc)"
                placeholder="Пароль"
                class="pr-8"
                :class="errorsMap[acc.id]?.password ? 'border-red-500' : ''"
              />
              <button
                type="button"
                @click="togglePassword(acc.id)"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Icon
                  :icon="
                    showPasswordMap[acc.id]
                      ? 'material-symbols:visibility'
                      : 'material-symbols:visibility-off'
                  "
                  width="20"
                  height="20"
                />
              </button>
            </div>
          </TableCell>

          <!-- Удалить -->
          <TableCell>
            <Icon
              icon="material-symbols:delete-outline"
              width="24"
              height="24"
              class="cursor-pointer"
              @click="removeAccount(acc.id)"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
