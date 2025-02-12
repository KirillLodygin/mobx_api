import { makeAutoObservable, runInAction } from 'mobx'
import moment from 'moment'
import { Faker, en } from '@faker-js/faker'
import { User } from '../types'

class UsersTableStore {
  users: User[] = []
  filteredUsers: User[] = []
  sorting: Record<string, boolean | undefined> = {}
  filterValue: string | undefined = undefined
  loading = false
  errorMessage: string | undefined = undefined

  constructor() {
    makeAutoObservable(this)
    this.generateUsers()
  }

  async generateUsers(): Promise<void> {
    try {
      this.loading = true
      this.errorMessage = undefined

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const randomNumber = Math.random()
      if (randomNumber <= 0.25) {
        throw new Error('Имитация ошибки при загрузке данных')
      }

      const faker = new Faker({ locale: en })
      const UserStatuses = ['Активен', 'Неактивен']

      for (let i = 0; i < 20; i++) {
        const date = faker.date.past()
        const formattedDate = moment(date).format('DD.MM.YYYY')

        const user: User = {
          key: i + 1,
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          registrationDate: formattedDate,
          userStatus: UserStatuses[faker.datatype.boolean() ? 0 : 1],
          address: faker.address.street(),
          phone: faker.phone.number(),
          historyActivities: faker.lorem.words(8),
        }

        this.users.push(user)
      }

      this.filteredUsers = [...this.users]
    } catch (error) {
      this.errorMessage = `Ошибка при загрузке данных! (${error})`
    } finally {
      this.loading = false
    }
  }

  setSorting(dataIndex: string, order: 'ascend' | 'descend') {
    runInAction(() => {
      this.sorting[dataIndex] = order === 'ascend'
      this.applySortAndFilter()
    })
  }

  setFilter(value: string | undefined) {
    runInAction(() => {
      this.filterValue = value
      this.applySortAndFilter()
    })

    if (value === undefined) {
      this.filterValue = undefined
      this.filteredUsers = this.users
    }
  }

  applySortAndFilter() {
    let sortedUsers = [...this.users]

    Object.entries(this.sorting).forEach(([dataIndex, isAscending]) => {
      if (isAscending !== undefined) {
        sortedUsers = sortedUsers.sort((a, b) => {
          const valueA = a[dataIndex as keyof User]
          const valueB = b[dataIndex as keyof User]

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
          } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return isAscending ? valueA - valueB : valueB - valueA
          } else {
            throw new Error(`Unsupported type for ${dataIndex}`)
          }
        })
      }
    })

    if (this.filterValue) {
      sortedUsers = sortedUsers.filter((user) => user.userStatus === this.filterValue)
    }

    this.filteredUsers = sortedUsers
  }

  retryGenerateUsers() {
    this.generateUsers()
  }
}

export default new UsersTableStore()
