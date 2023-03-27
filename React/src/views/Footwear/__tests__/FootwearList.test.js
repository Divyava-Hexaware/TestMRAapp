const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import FootwearList from '../FootwearList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Footwear rows when api response has data', async () => {
    const endPoint = 'footwear'
    const getFootwearListResponse = [
        {
            id: 1,
            productname: 'productname',
            description: 'description',
            price: 75,
            offer: true,
            availability: 43,
            deliverydate: 'deliverydate',
            daystodeliver: 52,
            offerprice: 4,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getFootwearListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <FootwearList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const footwearProductnameCell = await screen.findByText(/productname/i)

    expect(footwearProductnameCell).toHaveTextContent(/productname/i)
    mock.reset()
})
