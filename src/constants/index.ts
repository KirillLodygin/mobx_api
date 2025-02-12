import { User } from '../types'
import { Key } from 'react'

export const TABLE_COLUMNS = [
  {
    title: 'Имя',
    dataIndex: 'fullName',
    key: 'fullName',
    sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
  },
  {
    title: 'Электронная почта',
    dataIndex: 'email',
    key: 'email',
    sorter: (a: User, b: User) => a.email.localeCompare(b.email),
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'registrationDate',
    key: 'registrationDate',
    sorter: (a: User, b: User) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime(),
  },
  {
    title: 'Статус',
    dataIndex: 'userStatus',
    key: 'userStatus',
    filters: [
      { text: 'Активен', value: 'Активен' },
      { text: 'Неактивен', value: 'Неактивен' },
    ],
    onFilter: (value: boolean | Key, record: User) => record.userStatus === value,
  },
]

export const USER_DETAILS = [
  {
    label: 'Имя:',
    value: 'fullName',
  },
  {
    label: 'Дата регистрации:',
    value: 'registrationDate',
  },
  {
    label: 'Адрес:',
    value: 'address',
  },
  {
    label: 'Электронная почта:',
    value: 'email',
  },
  {
    label: 'Телефон:',
    value: 'phone',
  },
  {
    label: 'Статус:',
    value: 'userStatus',
  },
  {
    label: 'История активности:',
    value: 'historyActivities',
  },
]
