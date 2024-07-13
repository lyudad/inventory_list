import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@src/store'
import { InventoryList } from './pages/inventoryList'

import { injectStore } from '@src/utils/api'

injectStore(store)

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <InventoryList />
          {/* 
            <RouterProvider router={router} />
          */}
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
