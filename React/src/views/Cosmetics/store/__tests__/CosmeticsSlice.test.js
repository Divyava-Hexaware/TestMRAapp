import store from 'store/store'
import {
    cosmeticsAdded,
    cosmeticsDeleted,
    cosmeticsUpdated,
} from '../cosmeticsSlice'

describe('testing cosmetics redux store reducers', () => {
    test('add cosmetics to store test', () => {
        let state = store.getState().cosmetics
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 30,
            offer: true,
            availability: 97,
            deliverydate:
                'Mon Mar 27 2023 09:54:00 GMT+0000 (Coordinated Universal Time)',
            daystodeliver: 76,
            offerprice: 59,
        }
        store.dispatch(cosmeticsAdded(initialInput))
        state = store.getState().cosmetics
        expect(state.entities).toHaveLength(1)
    })

    test('update cosmetics from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            productname: 'productname',
            description: 'description',
            price: 99,
            offer: false,
            availability: 30,
            deliverydate:
                'Mon Mar 27 2023 09:54:00 GMT+0000 (Coordinated Universal Time)',
            daystodeliver: 74,
            offerprice: 32,
        }
        store.dispatch(cosmeticsAdded(initialInput))
        let state = store.getState().cosmetics
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            productname: 'productname',
            description: 'description',
            price: 39,
            offer: true,
            availability: 65,
            deliverydate: 'deliverydate',
            daystodeliver: 37,
            offerprice: 22,
        }
        store.dispatch(cosmeticsUpdated(updatedInput))
        state = store.getState().cosmetics
        let changedCosmetics = state.entities.find((p) => p.id === 2)
        expect(changedCosmetics).toStrictEqual(updatedInput)
    })

    test('delete cosmetics from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            productname: 'productname',
            description: 'description',
            price: 94,
            offer: false,
            availability: 68,
            deliverydate:
                'Mon Mar 27 2023 09:54:00 GMT+0000 (Coordinated Universal Time)',
            daystodeliver: 33,
            offerprice: 40,
        }
        store.dispatch(cosmeticsAdded(initialInput))
        let state = store.getState().cosmetics
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            cosmeticsDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().cosmetics
        expect(state.entities).toHaveLength(2)
    })
})
