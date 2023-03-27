import store from 'store/store'
import {
    footwearAdded,
    footwearDeleted,
    footwearUpdated,
} from '../footwearSlice'

describe('testing footwear redux store reducers', () => {
    test('add footwear to store test', () => {
        let state = store.getState().footwear
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 65,
            offer: true,
            availability: 67,
            deliverydate:
                'Mon Mar 27 2023 09:54:11 GMT+0000 (Coordinated Universal Time)',
            daystodeliver: 7,
            offerprice: 29,
        }
        store.dispatch(footwearAdded(initialInput))
        state = store.getState().footwear
        expect(state.entities).toHaveLength(1)
    })

    test('update footwear from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            productname: 'productname',
            description: 'description',
            price: 72,
            offer: true,
            availability: 78,
            deliverydate:
                'Mon Mar 27 2023 09:54:11 GMT+0000 (Coordinated Universal Time)',
            daystodeliver: 49,
            offerprice: 47,
        }
        store.dispatch(footwearAdded(initialInput))
        let state = store.getState().footwear
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            productname: 'productname',
            description: 'description',
            price: 37,
            offer: false,
            availability: 18,
            deliverydate: 'deliverydate',
            daystodeliver: 61,
            offerprice: 60,
        }
        store.dispatch(footwearUpdated(updatedInput))
        state = store.getState().footwear
        let changedFootwear = state.entities.find((p) => p.id === 2)
        expect(changedFootwear).toStrictEqual(updatedInput)
    })

    test('delete footwear from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            productname: 'productname',
            description: 'description',
            price: 16,
            offer: true,
            availability: 23,
            deliverydate:
                'Mon Mar 27 2023 09:54:11 GMT+0000 (Coordinated Universal Time)',
            daystodeliver: 35,
            offerprice: 82,
        }
        store.dispatch(footwearAdded(initialInput))
        let state = store.getState().footwear
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            footwearDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().footwear
        expect(state.entities).toHaveLength(2)
    })
})
