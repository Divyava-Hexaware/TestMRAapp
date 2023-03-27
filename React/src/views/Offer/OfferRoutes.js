import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const OfferList = Loadable(lazy(() => import('./OfferList')))
const EditOffer = Loadable(lazy(() => import('./EditOffer')))
const AddOffer = Loadable(lazy(() => import('./AddOffer')))

const OfferRoutes = [
    {
        path: '/Offer',
        element: <OfferList />,
    },
    {
        path: '/Offer/edit/:id',
        element: <EditOffer />,
    },
    {
        path: '/Offer/add',
        element: <AddOffer />,
    },
]

export default OfferRoutes
