import { configureStore } from '@reduxjs/toolkit'
import domainReducer from './slices/DomainSlice'
import emailReducer from './slices/EmailSlice'
import accountReducer from './slices/AccountSlice'
import platformReducer from './slices/PlatformSlice'
import { platformSlice } from './slices/PlatformSlice'

export default configureStore({
  reducer: {
    domain: domainReducer,
    email: emailReducer,
    account: accountReducer,
    platform: platformReducer
  }
})