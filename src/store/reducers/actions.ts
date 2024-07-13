import { createAsyncThunk } from '@reduxjs/toolkit'

import { IInventoryItem, ICreateInventoryReq, IThunkAPI } from '@src/models'
import { fetchInventoryListService, createInventoryService } from '@src/services'

export const fetchInventoryList = createAsyncThunk<
  { inventoryList: IInventoryItem[] },
  {},
  IThunkAPI
>('fetchInventoryList', async ({}, thunkAPI) => {
  try {
    const inventoryData = await fetchInventoryListService()

    return inventoryData
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e)
  }
})


export const createInventory = createAsyncThunk<
  undefined,
  ICreateInventoryReq,
  IThunkAPI
>(
  'createInventory',
  async ({ name, quantity, onSuccess = () => {} }, thunkAPI) => {
    try {
      await createInventoryService({
        name,
        quantity,
      })
      onSuccess()

      return undefined
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)