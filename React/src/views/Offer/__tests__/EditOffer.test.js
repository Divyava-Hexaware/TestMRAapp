const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditOffer from '../EditOffer'
import { OfferAdded } from '../store/OfferSlice'
beforeAll(() => {
    store.dispatch(
        OfferAdded({
            id: 1,
            price: 90,
            offer: true,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="Offer/edit/1" replace />}
                            />
                            <Route
                                path="Offer/edit/:id"
                                element={<EditOffer />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of OfferEdit Component', () => {
    test('should render EditOffer and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveOfferButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)

        expect(saveOfferButtonElement).toBeInTheDocument()

        expect(priceElement).toBeInTheDocument()
        expect(offerElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Offer edit form', async () => {
        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)

        fireEvent.change(priceElement, { target: { value: 62 } })

        expect(priceElement.value).toBe(62)

        fireEvent.mouseDown(offerElement)
        const offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(offerlistbox.getByText(/True/))
        expect(offerElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(priceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveOfferButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveOfferButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(1)
    })
})
