import { createSlice } from '@reduxjs/toolkit'
import { fetchFootwear } from './Footwear.action'
import { addFootwear } from './Footwear.action'
import { editFootwear } from './Footwear.action'
import { deleteFootwear } from './Footwear.action'

const fetchFootwearExtraReducer = {
    [fetchFootwear.pending]: (state, action) => {
        state.loading = true
    },
    [fetchFootwear.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchFootwear.rejected]: (state, action) => {
        state.loading = false
    },
}

const addFootwearExtraReducer = {
    [addFootwear.pending]: (state, action) => {
        state.loading = true
    },
    [addFootwear.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addFootwear.rejected]: (state, action) => {
        state.loading = false
    },
}

const editFootwearExtraReducer = {
    [editFootwear.pending]: (state, action) => {
        state.loading = true
    },
    [editFootwear.fulfilled]: (state, action) => {
        const {
            id,
            productname,
            description,
            price,
            offer,
            availability,
            deliverydate,
            daystodeliver,
            offerprice,
        } = action.payload
        const existingFootwear = state.entities.find(
            (Footwear) => Footwear.id.toString() === id.toString()
        )
        if (existingFootwear) {
            existingFootwear.productname = productname
            existingFootwear.description = description
            existingFootwear.price = price
            existingFootwear.offer = offer
            existingFootwear.availability = availability
            existingFootwear.deliverydate = deliverydate
            existingFootwear.daystodeliver = daystodeliver
            existingFootwear.offerprice = offerprice
        }
        state.loading = false
    },
    [editFootwear.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteFootwearExtraReducer = {
    [deleteFootwear.pending]: (state, action) => {
        state.loading = true
    },
    [deleteFootwear.fulfilled]: (state, action) => {
        const id = action.payload
        const existingFootwear = state.entities.find(
            (Footwear) => Footwear.id.toString() === id.toString()
        )
        if (existingFootwear) {
            state.entities = state.entities.filter(
                (Footwear) => Footwear.id !== id
            )
        }
        state.loading = false
    },
    [deleteFootwear.rejected]: (state, action) => {
        state.loading = false
    },
}
const FootwearSlice = createSlice({
    name: 'Footwear',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        FootwearAdded(state, action) {
            state.entities.push(action.payload)
        },
        FootwearUpdated(state, action) {
            const {
                id,
                productname,
                description,
                price,
                offer,
                availability,
                deliverydate,
                daystodeliver,
                offerprice,
            } = action.payload
            const existingFootwear = state.entities.find(
                (Footwear) => Footwear.id.toString() === id.toString()
            )
            if (existingFootwear) {
                existingFootwear.productname = productname
                existingFootwear.description = description
                existingFootwear.price = price
                existingFootwear.offer = offer
                existingFootwear.availability = availability
                existingFootwear.deliverydate = deliverydate
                existingFootwear.daystodeliver = daystodeliver
                existingFootwear.offerprice = offerprice
            }
        },
        FootwearDeleted(state, action) {
            const { id } = action.payload
            const existingFootwear = state.entities.find(
                (Footwear) => Footwear.id.toString() === id.toString()
            )
            if (existingFootwear) {
                state.entities = state.entities.filter(
                    (Footwear) => Footwear.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchFootwearExtraReducer,
        ...addFootwearExtraReducer,
        ...editFootwearExtraReducer,
        ...deleteFootwearExtraReducer,
    },
})

export const { FootwearAdded, FootwearUpdated, FootwearDeleted } =
    FootwearSlice.actions

export default FootwearSlice.reducer
