
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'

import inventoryListReducer from './reducers'

const persistConfig = {
  key: 'store',
  whitelist: [],
  storage,
}

const reducers = combineReducers({
  inventoryList: inventoryListReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
