import axios from 'axios'
import { Store } from '@reduxjs/toolkit'
import { BASE_URL } from '@src/constants/api'
import { RootState } from '@src/store'

let store: Store<RootState>

const apiInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
})

export const injectStore = (_store: Store<RootState>) => {
  store = _store
}


apiInstance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    try {
      return Promise.reject(error)
    } catch (e) {
      console.log('Error in interceptors.response', e)
    }
  },
)

export default apiInstance