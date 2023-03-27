import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Footwear'

export const fetchFootwear = createAsyncThunk(
    'Footwear/fetchFootwear',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Footwear = await response.data
        return Footwear
    }
)

export const addFootwear = createAsyncThunk(
    'Footwear/addFootwear',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Footwear = await response.data
        thunkAPI.dispatch(showSuccess('Footwear added successfully'))
        return Footwear
    }
)

export const editFootwear = createAsyncThunk(
    'Footwear/editFootwear',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Footwear = await response.data
        thunkAPI.dispatch(showSuccess('Footwear updated successfully'))
        return Footwear
    }
)

export const deleteFootwear = createAsyncThunk(
    'Footwear/deleteFootwear',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Footwear deleted successfully.')
            )
            return data.id
        }
    }
)
