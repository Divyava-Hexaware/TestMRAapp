import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchFootwear,
    addFootwear,
    editFootwear,
    deleteFootwear,
} from '../footwear.action'

const getFootwearListResponse = [
    {
        id: 1,
        productname: 'productname',
        description: 'description',
        price: 51,
        offer: true,
        availability: 21,
        deliverydate: 'deliverydate',
        daystodeliver: 31,
        offerprice: 100,
    },
]

const addFootwearListResponse = (data) => {
    return { id: 2, ...data }
}
const editFootwearListResponse = (data) => {
    return data
}

describe('should test Footwear redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'footwear'
    test('Should be able to fetch the footwear list and update footwear redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getFootwearListResponse)
        const result = await store.dispatch(fetchFootwear())
        const footwearList = result.payload
        expect(result.type).toBe('footwear/fetchFootwear/fulfilled')
        expect(footwearList).toEqual(getFootwearListResponse)

        const state = store.getState().footwear
        expect(state.entities).toEqual(footwearList)
    })

    test('Should be able to add new footwear to list and make post api and update footwear redux store', async () => {
        const body = {
            productname: 'productname',
            description: 'description',
            price: 34,
            offer: false,
            availability: 10,
            deliverydate: 'deliverydate',
            daystodeliver: 100,
            offerprice: 44,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addFootwearListResponse(body)
        )
        const result = await store.dispatch(addFootwear(body))
        const footwearItem = result.payload
        expect(result.type).toBe('footwear/addFootwear/fulfilled')
        expect(footwearItem).toEqual(addFootwearListResponse(body))

        const state = store.getState().footwear
        expect(state.entities).toContainEqual(addFootwearListResponse(body))
    })

    test('Should be able to edit footwear in list and make put api call and update footwear redux store', async () => {
        const body = {
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 25,
            offer: true,
            availability: 24,
            deliverydate: 'deliverydate',
            daystodeliver: 2,
            offerprice: 64,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editFootwearListResponse(body)
        )
        const result = await store.dispatch(editFootwear(body))
        const footwearItem = result.payload
        expect(result.type).toBe('footwear/editFootwear/fulfilled')
        expect(footwearItem).toEqual(editFootwearListResponse(body))

        const state = store.getState().footwear
        let changedFootwear = state.entities.find((p) => p.id === body.id)
        expect(changedFootwear.name).toEqual(body.name)
    })

    test('Should be able to delete footwear in list and update footwear redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().footwear
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteFootwear(input))
        const deletId = result.payload
        expect(result.type).toBe('footwear/deleteFootwear/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().footwear
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
