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
import EditFootwear from '../EditFootwear'
import { FootwearAdded } from '../store/FootwearSlice'
beforeAll(() => {
    store.dispatch(
        FootwearAdded({
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 72,
            offer: true,
            availability: 42,
            deliverydate: 'deliverydate',
            daystodeliver: 37,
            offerprice: 3,
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
                                element={
                                    <Navigate to="Footwear/edit/1" replace />
                                }
                            />
                            <Route
                                path="Footwear/edit/:id"
                                element={<EditFootwear />}
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

describe('testing view of FootwearEdit Component', () => {
    test('should render EditFootwear and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveFootwearButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const productnameElement = screen.getByLabelText(/Productname/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const offerElement = screen.getByLabelText(/Offer/i)
        const availabilityElement = screen.getByLabelText(/Availability/i)
        const deliverydateElement = screen.getByLabelText(/Deliverydate/i)
        const daystodeliverElement = screen.getByLabelText(/Daystodeliver/i)
        const offerpriceElement = screen.getByLabelText(/Offerprice/i)

        expect(saveFootwearButtonElement).toBeInTheDocument()

        expect(productnameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
        expect(offerElement).toBeInTheDocument()
        expect(availabilityElement).toBeInTheDocument()
        expect(deliverydateElement).toBeInTheDocument()
        expect(daystodeliverElement).toBeInTheDocument()
        expect(offerpriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Footwear edit form', async () => {
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
        fireEvent.change(priceElement, { target: { value: 15 } })
        fireEvent.change(availabilityElement, { target: { value: 17 } })
        fireEvent.change(deliverydateElement, {
            target: { value: 'deliverydate' },
        })
        fireEvent.change(daystodeliverElement, { target: { value: 43 } })
        fireEvent.change(offerpriceElement, { target: { value: 29 } })

        expect(productnameElement.value).toBe('productname')

        expect(descriptionElement.value).toBe('description')

        expect(priceElement.value).toBe(15)
        expect(availabilityElement.value).toBe(17)
        expect(deliverydateElement.value).toBe('deliverydate')
        expect(daystodeliverElement.value).toBe(43)
        expect(offerpriceElement.value).toBe(29)

        fireEvent.mouseDown(offerElement)
        const offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(offerlistbox.getByText(/True/))
        expect(offerElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const productnameElement = screen.getByLabelText(/Productname/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const availabilityElement = screen.getByLabelText(/Availability/i)
        const deliverydateElement = screen.getByLabelText(/Deliverydate/i)
        const daystodeliverElement = screen.getByLabelText(/Daystodeliver/i)
        const offerpriceElement = screen.getByLabelText(/Offerprice/i)

        fireEvent.change(productnameElement, { target: { value: '' } })
        fireEvent.change(descriptionElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        fireEvent.change(availabilityElement, { target: { value: '' } })
        fireEvent.change(deliverydateElement, { target: { value: '' } })
        fireEvent.change(daystodeliverElement, { target: { value: '' } })
        fireEvent.change(offerpriceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveFootwearButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveFootwearButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
