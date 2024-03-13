import { createSlice } from '@reduxjs/toolkit'

export const platformSlice = createSlice({
  name: 'platform',
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
        state.value = action.payload
    } 
  }
})

// Action creators are generated for each case reducer function
export const platformActions = platformSlice.actions

export default platformSlice.reducer