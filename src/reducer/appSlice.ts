import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface AppState {
  subjectList: string[]
}

const initialState: AppState = {
  subjectList: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSubjectList: (state, action: PayloadAction<string[]>) => {
      state.subjectList = action.payload
    },
  },
})

export const { setSubjectList } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSubjectList = (state: RootState) => state.app.subjectList

export default counterSlice.reducer
