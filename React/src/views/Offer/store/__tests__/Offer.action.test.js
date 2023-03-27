import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchOffer, addOffer, editOffer, deleteOffer } from '../offer.action'

const getOfferListResponse = [
    {
        id: 1,
        price: 50,
        offer: false,
    },
]

const addOfferListResponse = (data) => {
    return { id: 2, ...data }
}
const editOfferListResponse = (data) => {
    return data
}

describe('should test Offer redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'offer'
    test('Should be able to fetch the offer list and update offer redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getOfferListResponse)
        const result = await store.dispatch(fetchOffer())
        const offerList = result.payload
        expect(result.type).toBe('offer/fetchOffer/fulfilled')
        expect(offerList).toEqual(getOfferListResponse)

        const state = store.getState().offer
        expect(state.entities).toEqual(offerList)
    })

    test('Should be able to add new offer to list and make post api and update offer redux store', async () => {
        const body = {
            price: 12,
            offer: false,
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addOfferListResponse(body))
        const result = await store.dispatch(addOffer(body))
        const offerItem = result.payload
        expect(result.type).toBe('offer/addOffer/fulfilled')
        expect(offerItem).toEqual(addOfferListResponse(body))

        const state = store.getState().offer
        expect(state.entities).toContainEqual(addOfferListResponse(body))
    })

    test('Should be able to edit offer in list and make put api call and update offer redux store', async () => {
        const body = {
            id: 1,
            price: 45,
            offer: true,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editOfferListResponse(body)
        )
        const result = await store.dispatch(editOffer(body))
        const offerItem = result.payload
        expect(result.type).toBe('offer/editOffer/fulfilled')
        expect(offerItem).toEqual(editOfferListResponse(body))

        const state = store.getState().offer
        let changedOffer = state.entities.find((p) => p.id === body.id)
        expect(changedOffer.name).toEqual(body.name)
    })

    test('Should be able to delete offer in list and update offer redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().offer
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteOffer(input))
        const deletId = result.payload
        expect(result.type).toBe('offer/deleteOffer/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().offer
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
