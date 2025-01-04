import { configureStore } from '@reduxjs/toolkit'
import cineworldReducer from "./cineworldSlice"

export const store = configureStore({
  reducer: {
    cineworldData: cineworldReducer
  },
})