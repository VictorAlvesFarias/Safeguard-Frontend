import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    value: []
  },
  reducers: {
    add: (state:any,action:any) => {
        const newData = state.value.push(action.payload)
        state.value = newData
    },
    remove: (state:any,action:any) => {
        const newData = state.value.filter((item:any) => action.payload != item.id)
        state.value = newData
    },
    set: (state:any,action:any) => {
        console.log(action.payload)
        state.value = action.payload
    } 
  }
})

// Action creators are generated for each case reducer function
export const accountActions = accountSlice.actions

export default accountSlice.reducer