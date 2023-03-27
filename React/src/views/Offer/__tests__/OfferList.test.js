const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import OfferList from '../OfferList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Offer rows when api response has data', async () => {
    const endPoint = 'offer'
    const getOfferListResponse = [
        {
            id: 1,
            price: 33,
            offer: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getOfferListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <OfferList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const offerPriceCell = await screen.findByText(/33/i)

    expect(offerPriceCell).toHaveTextContent(/33/i)
    mock.reset()
})
