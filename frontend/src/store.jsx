import { configureStore } from '@reduxjs/toolkit'

import productReducer from './reducers/productReducers'


export const store = configureStore({
      reducer: {
            product: productReducer,
      },
      //middleware: () => new Tuple(thunk, logger)
}) 
