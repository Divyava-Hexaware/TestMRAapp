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
import AddCosmetics from '../AddCosmetics'

beforeEach(() => {
    const endPoint = 'Cosmetics'
    const getStudentListResponse = [
        {
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 61,
            offer: true,
            availability: 67,
            deliverydate: 'deliverydate',
            daystodeliver: 92,
            offerprice: 72,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddCosmetics />
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

describe('testing view CosmeticsAdd Component', () => {
    test('should render AddCosmetics and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addCosmeticsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const productnameElement = screen.getByLabelText(/Productname/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)
        const availabilityElement = screen.getByLabelText(/Availability/i)
        const deliverydateElement = screen.getByLabelText(/Deliverydate/i)
        const daystodeliverElement = screen.getByLabelText(/Daystodeliver/i)
        const offerpriceElement = screen.getByLabelText(/Offerprice/i)

        expect(addCosmeticsButtonElement).toBeInTheDocument()

        expect(productnameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
        expect(offerElement).toBeInTheDocument()
        expect(availabilityElement).toBeInTheDocument()
        expect(deliverydateElement).toBeInTheDocument()
        expect(daystodeliverElement).toBeInTheDocument()
        expect(offerpriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Cosmetics add form', async () => {
        const productnameElement = screen.getByLabelText(/Productname/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)
        const availabilityElement = screen.getByLabelText(/Availability/i)
        const deliverydateElement = screen.getByLabelText(/Deliverydate/i)
        const daystodeliverElement = screen.getByLabelText(/Daystodeliver/i)
        const offerpriceElement = screen.getByLabelText(/Offerprice/i)

        fireEvent.change(productnameElement, {
            target: { value: 'productname' },
        })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
        fireEvent.change(priceElement, { target: { value: 25 } })
        fireEvent.change(availabilityElement, { target: { value: 96 } })
        fireEvent.change(deliverydateElement, {
            target: { value: 'deliverydate' },
        })
        fireEvent.change(daystodeliverElement, { target: { value: 11 } })
        fireEvent.change(offerpriceElement, { target: { value: 6 } })

        fireEvent.mouseDown(offerElement)
        const offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(offerlistbox.getByText(/False/))
        expect(offerElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Cosmetics button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addCosmeticsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addCosmeticsButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(8)
    })
})
