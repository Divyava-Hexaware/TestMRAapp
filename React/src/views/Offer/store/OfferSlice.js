import { createSlice } from '@reduxjs/toolkit'
import { fetchOffer } from './Offer.action'
import { addOffer } from './Offer.action'
import { editOffer } from './Offer.action'
import { deleteOffer } from './Offer.action'

const fetchOfferExtraReducer = {
    [fetchOffer.pending]: (state, action) => {
        state.loading = true
    },
    [fetchOffer.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchOffer.rejected]: (state, action) => {
        state.loading = false
    },
}

const addOfferExtraReducer = {
    [addOffer.pending]: (state, action) => {
        state.loading = true
    },
    [addOffer.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addOffer.rejected]: (state, action) => {
        state.loading = false
    },
}

const editOfferExtraReducer = {
    [editOffer.pending]: (state, action) => {
        state.loading = true
    },
    [editOffer.fulfilled]: (state, action) => {
        const { id, price, offer } = action.payload
        const existingOffer = state.entities.find(
            (Offer) => Offer.id.toString() === id.toString()
        )
        if (existingOffer) {
            existingOffer.price = price
            existingOffer.offer = offer
        }
        state.loading = false
    },
    [editOffer.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteOfferExtraReducer = {
    [deleteOffer.pending]: (state, action) => {
        state.loading = true
    },
    [deleteOffer.fulfilled]: (state, action) => {
        const id = action.payload
        const existingOffer = state.entities.find(
            (Offer) => Offer.id.toString() === id.toString()
        )
        if (existingOffer) {
            state.entities = state.entities.filter((Offer) => Offer.id !== id)
        }
        state.loading = false
    },
    [deleteOffer.rejected]: (state, action) => {
        state.loading = false
    },
}
const OfferSlice = createSlice({
    name: 'Offer',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        OfferAdded(state, action) {
            state.entities.push(action.payload)
        },
        OfferUpdated(state, action) {
            const { id, price, offer } = action.payload
            const existingOffer = state.entities.find(
                (Offer) => Offer.id.toString() === id.toString()
            )
            if (existingOffer) {
                existingOffer.price = price
                existingOffer.offer = offer
            }
        },
        OfferDeleted(state, action) {
            const { id } = action.payload
            const existingOffer = state.entities.find(
                (Offer) => Offer.id.toString() === id.toString()
            )
            if (existingOffer) {
                state.entities = state.entities.filter(
                    (Offer) => Offer.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchOfferExtraReducer,
        ...addOfferExtraReducer,
        ...editOfferExtraReducer,
        ...deleteOfferExtraReducer,
    },
})

export const { OfferAdded, OfferUpdated, OfferDeleted } = OfferSlice.actions

export default OfferSlice.reducer
