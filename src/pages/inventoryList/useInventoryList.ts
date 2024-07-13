import { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@src/store'
import { inventoryList as inventoryListSelector } from '@src/store/selectors'
import { fetchInventoryList, createInventory } from '@src/store/reducers/actions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { timelineSchema } from './inventorySchema'
import { IToast } from '@src/models'

interface IInventoryValues {
    name: string,
    quantity: string
  }

export const useInventoryList = () => {
  const [toast, setToast] = useState<IToast | null>(null)
  const dispatch = useAppDispatch()

  const {
    inventoryList,
    loading,
  } = useSelector(inventoryListSelector)

  const fetchList = useCallback(() => {
    dispatch(
        fetchInventoryList({})
    )
  }, [
    dispatch,
  ])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const methods = useForm<IInventoryValues>({
    // @ts-expect-error promblem with type need investigation
    resolver: yupResolver(timelineSchema()),
  })

  const { handleSubmit, formState: { isValid }, } = methods

  const handleAddInventoryItem = useCallback(
      ({ name, quantity }: IInventoryValues) => {
        dispatch(
            createInventory({
            name,
            quantity,
            onSuccess: () => {
              setToast({
                type: 'success',
                message: 'Inventory was added',
              })
              fetchList()
            },
          }),
        )
      },
      [],
    )

    const handleCloseAlert = useCallback(() => {
        setToast(null)
      }, [toast, dispatch])

  return {
    inventoryList,
    loading,
    methods,
    handleSubmit,
    handleAddInventoryItem,
    toast,
    handleCloseAlert
  }
}