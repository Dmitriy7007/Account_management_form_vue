import { recordTypes } from '@/consts/consts'
import type { AccountType } from '@/types/types'

export const validateLabels = (labelsRaw: string) => {
  if (!labelsRaw) return true
  return labelsRaw
    .split(';')
    .map((s) => s.trim())
    .every((item) => item.length <= 50)
}

export const validateLogin = (login: string) => {
  return login.length >= 0 && login.length <= 100
}

export const validatePassword = (password: string | null, type: AccountType | null) => {
  if (type === recordTypes[1] || !password) return true

  return password.length <= 100 && password.length >= 0
}
