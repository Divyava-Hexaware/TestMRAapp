import { configureStore } from '@reduxjs/toolkit'
import OfferReducer from '../views/Offer/store/OfferSlice'
import FootwearReducer from '../views/Footwear/store/FootwearSlice'
import CosmeticsReducer from '../views/Cosmetics/store/CosmeticsSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        Cosmetics: CosmeticsReducer,
        Footwear: FootwearReducer,
        Offer: OfferReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
