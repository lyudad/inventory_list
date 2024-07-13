import { createSlice } from '@reduxjs/toolkit'
import { IInventoryListState } from '@src/models/inventoryList'
import { fetchInventoryList } from './actions'

const initialState: IInventoryListState = {
  error: null,
  loading: false,
  inventoryList: [],
}

const patientsListSlice = createSlice({
  name: 'inventoryList',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
    clearPatientsList() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInventoryList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchInventoryList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.inventoryList = payload.inventoryList
    })
    builder.addCase(fetchInventoryList.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload || null
    })
  },
})

export const { clearError, clearPatientsList } = patientsListSlice.actions

export default patientsListSlice.reducer