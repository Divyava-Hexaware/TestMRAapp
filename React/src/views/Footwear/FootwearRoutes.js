import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const FootwearList = Loadable(lazy(() => import('./FootwearList')))
const EditFootwear = Loadable(lazy(() => import('./EditFootwear')))
const AddFootwear = Loadable(lazy(() => import('./AddFootwear')))

const FootwearRoutes = [
    {
        path: '/Footwear',
        element: <FootwearList />,
    },
    {
        path: '/Footwear/edit/:id',
        element: <EditFootwear />,
    },
    {
        path: '/Footwear/add',
        element: <AddFootwear />,
    },
]

export default FootwearRoutes
