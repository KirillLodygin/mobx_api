import React from 'react'
import { Modal } from 'antd'
import { User } from '../types'
import { USER_DETAILS } from '../constants'

interface Props {
  user: User | undefined
  isOpen: boolean
  onClose: () => void
}

const UserDetailsModal: React.FC<Props> = ({ user, isOpen, onClose }) => {
  return (
    <Modal title="Подробная информация о пользователе" visible={isOpen} onCancel={onClose} footer={null}>
      {user && (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {USER_DETAILS.map((detail) => (
              <tr key={detail.label}>
                <td
                  style={{
                    padding: '8px',
                    whiteSpace: 'nowrap',
                    color: '#999',
                    fontWeight: '300',
                    verticalAlign: 'top',
                  }}
                >
                  {detail.label}
                </td>
                <td style={{ padding: '8px', verticalAlign: 'top' }}>{user[detail.value as keyof User]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Modal>
  )
}

export default UserDetailsModal
