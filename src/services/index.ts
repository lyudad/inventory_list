import { IInventoryItem } from '@src/models'
import { IInventoryItemRes } from '@src/models/services/inventory'
import { api, formatRequestError } from '@src/utils'

export const fetchInventoryListService = async (
): Promise<{ inventoryList: IInventoryItem[] }> => {
  try {
    const { data }: { data: IInventoryItemRes[] } = await api.get(
      'inventory',
      {
      },
    )

    const inventoryList: IInventoryItem[] = data.map((inventoryItem) => ({
      name: inventoryItem.name,
      quantity: inventoryItem.quantity,
    }))

    return {inventoryList}
  } catch (e: any) {
    const errorMessage: string = formatRequestError(
      e?.response?.data || e.message,
    )

    throw errorMessage
  }
}

export const createInventoryService = async ({
  name,
  quantity,
}: IInventoryItem): Promise<void> => {
  try {
    await api.post('inventory', [{ name, quantity: Number(quantity)}])
    return
  } catch (e: any) {
    const errorMessage: string = formatRequestError(
      e?.response?.data || e.message,
    )

    throw errorMessage
  }
}