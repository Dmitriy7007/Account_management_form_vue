import type { IAccount } from '@/types/types'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'accounts_v1'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as IAccount[],
  }),
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) this.accounts = JSON.parse(raw) as IAccount[]
      } catch (e) {
        console.error('load accounts failed', e)
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts))
    },
    add(account: IAccount) {
      this.accounts.push(account)
      this.persist()
    },
    update(updated: IAccount) {
      const idx = this.accounts.findIndex((a) => a.id === updated.id)
      if (idx >= 0) this.accounts.splice(idx, 1, updated)
      this.persist()
    },
    remove(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id)
      this.persist()
    },
  },
})
