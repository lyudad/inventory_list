export interface IInventoryListState {
    error: string | null
    loading: boolean
    inventoryList: IInventoryItem[]
  }
  
  export interface IInventoryItem {
    name: string
    quantity: string
  }

  export interface ICreateInventoryReq {
    name: string
    quantity: string
    onSuccess: () => void
  }