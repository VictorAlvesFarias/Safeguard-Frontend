import { configureStore } from '@reduxjs/toolkit'
import domainReducer from './slices/DomainSlice'
import emailReducer from './slices/EmailSlice'

export default configureStore({
  reducer: {
    domain: domainReducer,
    email: emailReducer
  }
})