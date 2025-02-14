import { User } from '../types'
import { Key } from 'react'

export const TABLE_COLUMNS = [
  {
    title: 'Имя',
    dataIndex: 'fullName',
    key: 'fullName',
    width: '25%',
    sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
    render: (value: string) => <div style={{ width: '100%' }}>{value}</div>,
  },
  {
    title: 'Электронная почта',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
    sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    render: (value: string) => <div style={{ width: '100%' }}>{value}</div>,
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'registrationDate',
    key: 'registrationDate',
    width: '25%',
    sorter: (a: User, b: User) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime(),
    render: (value: string) => <div style={{ width: '100%' }}>{value}</div>,
  },
  {
    title: 'Статус',
    dataIndex: 'userStatus',
    key: 'userStatus',
    width: '25%',
    filters: [
      { text: 'Активен', value: 'Активен' },
      { text: 'Неактивен', value: 'Неактивен' },
    ],
    onFilter: (value: boolean | Key, record: User) => record.userStatus === value,
    render: (value: string) => <div style={{ width: '100%' }}>{value}</div>,
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
