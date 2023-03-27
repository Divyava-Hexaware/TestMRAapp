const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddOffer from '../AddOffer'

beforeEach(() => {
    const endPoint = 'Offer'
    const getStudentListResponse = [
        {
            id: 1,
            price: 98,
            offer: false,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddOffer />
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

describe('testing view OfferAdd Component', () => {
    test('should render AddOffer and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addOfferButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)

        expect(addOfferButtonElement).toBeInTheDocument()

        expect(priceElement).toBeInTheDocument()
        expect(offerElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Offer add form', async () => {
        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)

        fireEvent.change(priceElement, { target: { value: 87 } })

        fireEvent.mouseDown(offerElement)
        const offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(offerlistbox.getByText(/False/))
        expect(offerElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Offer button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addOfferButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addOfferButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
