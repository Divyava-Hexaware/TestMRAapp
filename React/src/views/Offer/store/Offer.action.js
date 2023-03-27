import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Offer'

export const fetchOffer = createAsyncThunk('Offer/fetchOffer', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Offer = await response.data
    return Offer
})

export const addOffer = createAsyncThunk(
    'Offer/addOffer',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Offer = await response.data
        thunkAPI.dispatch(showSuccess('Offer added successfully'))
        return Offer
    }
)

export const editOffer = createAsyncThunk(
    'Offer/editOffer',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Offer = await response.data
        thunkAPI.dispatch(showSuccess('Offer updated successfully'))
        return Offer
    }
)

export const deleteOffer = createAsyncThunk(
    'Offer/deleteOffer',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Offer deleted successfully.')
            )
            return data.id
        }
    }
)
