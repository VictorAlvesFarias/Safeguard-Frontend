import { configureStore } from '@reduxjs/toolkit'
import domainReducer from './slices/DomainSlice'
import emailReducer from './slices/EmailSlice'
import accountReducer from './slices/AccountSlice'

export default configureStore({
  reducer: {
    domain: domainReducer,
    email: emailReducer,
    account: accountReducer
  }
})