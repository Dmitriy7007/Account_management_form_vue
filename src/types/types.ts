export type LabelItem = { text: string }

export type AccountType = 'Локальная' | 'LDAP'

export type IAccount = {
  id: string
  labels: LabelItem[]
  labelsRaw: string
  type: AccountType | null
  login: string
  password: string | null
}
