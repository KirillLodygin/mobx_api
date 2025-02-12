import React, { useState } from 'react'
import { Table, Button, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import UsersTableStore from '../stores/UsersTableStore'
import { User } from '../types'
import { TABLE_COLUMNS } from '../constants'
import UserDetailsModal from './UserDetailsModal'

const UsersTable: React.FC = () => {
  if (!UsersTableStore) return null

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.columnKey && sorter.order) {
      UsersTableStore.setSorting(sorter.columnKey, sorter.order)
    }
    if (filters.userStatus) {
      UsersTableStore.setFilter(filters.userStatus[0])
    } else {
      UsersTableStore.setFilter(undefined)
    }
  }

  const handleRowClick = (record: User) => {
    setSelectedUser(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const isError = !!UsersTableStore.errorMessage
  const isLoading = UsersTableStore.loading

  return (
    <>
      {isError ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>{UsersTableStore.errorMessage}</p>
          <Button onClick={() => UsersTableStore.retryGenerateUsers()}>Перезагрузить</Button>
        </div>
      ) : isLoading ? (
        <>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spin tip="Идёт загрузка..." />
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span>Загрузка данных...</span>
          </div>
        </>
      ) : (
        <Table<User>
          dataSource={UsersTableStore.filteredUsers}
          columns={TABLE_COLUMNS}
          pagination={{ pageSize: 10 }}
          onChange={handleChange}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      )}

      {selectedUser && <UserDetailsModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />}
    </>
  )
}

export default inject('usersTableStore')(observer(UsersTable))
