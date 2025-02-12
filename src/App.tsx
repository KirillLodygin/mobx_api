import React from 'react'
import { observer } from 'mobx-react-lite'
import { Provider } from 'mobx-react'
import { stores } from './stores'
import UsersTable from './components/UsersTable'

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <UsersTable />
    </Provider>
  )
}

export default observer(App)
