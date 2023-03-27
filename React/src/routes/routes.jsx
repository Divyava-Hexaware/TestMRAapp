import NotFound from 'views/sessions/NotFound'
import OfferRoutes from 'views/Offer/OfferRoutes'
import FootwearRoutes from 'views/Footwear/FootwearRoutes'
import CosmeticsRoutes from 'views/Cosmetics/CosmeticsRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [
                ...homeRoutes,
                ...CosmeticsRoutes,
                ...FootwearRoutes,
                ...OfferRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
