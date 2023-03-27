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
import EditCosmetics from '../EditCosmetics'
import { CosmeticsAdded } from '../store/CosmeticsSlice'
beforeAll(() => {
    store.dispatch(
        CosmeticsAdded({
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 70,
            offer: false,
            availability: 32,
            deliverydate: 'deliverydate',
            daystodeliver: 15,
            offerprice: 58,
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
                                    <Navigate to="Cosmetics/edit/1" replace />
                                }
                            />
                            <Route
                                path="Cosmetics/edit/:id"
                                element={<EditCosmetics />}
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

describe('testing view of CosmeticsEdit Component', () => {
    test('should render EditCosmetics and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveCosmeticsButtonElement = screen.getByRole('button', {
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

        expect(saveCosmeticsButtonElement).toBeInTheDocument()

        expect(productnameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
        expect(offerElement).toBeInTheDocument()
        expect(availabilityElement).toBeInTheDocument()
        expect(deliverydateElement).toBeInTheDocument()
        expect(daystodeliverElement).toBeInTheDocument()
        expect(offerpriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Cosmetics edit form', async () => {
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
        fireEvent.change(priceElement, { target: { value: 14 } })
        fireEvent.change(availabilityElement, { target: { value: 53 } })
        fireEvent.change(deliverydateElement, {
            target: { value: 'deliverydate' },
        })
        fireEvent.change(daystodeliverElement, { target: { value: 45 } })
        fireEvent.change(offerpriceElement, { target: { value: 70 } })

        expect(productnameElement.value).toBe('productname')

        expect(descriptionElement.value).toBe('description')

        expect(priceElement.value).toBe(14)
        expect(availabilityElement.value).toBe(53)
        expect(deliverydateElement.value).toBe('deliverydate')
        expect(daystodeliverElement.value).toBe(45)
        expect(offerpriceElement.value).toBe(70)

        fireEvent.mouseDown(offerElement)
        const offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(offerlistbox.getByText(/False/))
        expect(offerElement).toHaveTextContent(/False/i)
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
        const saveCosmeticsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveCosmeticsButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
