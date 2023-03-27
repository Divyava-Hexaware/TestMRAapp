import store from 'store/store'
import { offerAdded, offerDeleted, offerUpdated } from '../offerSlice'

describe('testing offer redux store reducers', () => {
    test('add offer to store test', () => {
        let state = store.getState().offer
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            price: 40,
            offer: false,
        }
        store.dispatch(offerAdded(initialInput))
        state = store.getState().offer
        expect(state.entities).toHaveLength(1)
    })

    test('update offer from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            price: 93,
            offer: false,
        }
        store.dispatch(offerAdded(initialInput))
        let state = store.getState().offer
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            price: 18,
            offer: false,
        }
        store.dispatch(offerUpdated(updatedInput))
        state = store.getState().offer
        let changedOffer = state.entities.find((p) => p.id === 2)
        expect(changedOffer).toStrictEqual(updatedInput)
    })

    test('delete offer from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            price: 58,
            offer: false,
        }
        store.dispatch(offerAdded(initialInput))
        let state = store.getState().offer
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            offerDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().offer
        expect(state.entities).toHaveLength(2)
    })
})
