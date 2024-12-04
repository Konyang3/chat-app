import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface AppState {
  subjectList: string[]
  isStudent: boolean
  curChatIsClose: boolean | null
  id: string | null
}

const initialState: AppState = {
  subjectList: [],
  isStudent: true,
  curChatIsClose: null,
  id: null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSubjectList: (state, action: PayloadAction<string[]>) => {
      state.subjectList = action.payload
    },
    setIsStudent: (state, action: PayloadAction<boolean>) => {
      state.isStudent = action.payload
    },
    setCurChatIsClose: (state, action: PayloadAction<boolean | null>) => {
      state.curChatIsClose = action.payload
    },
    setId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload
    }
  },
})

export const { setSubjectList, setIsStudent, setCurChatIsClose, setId } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSubjectList = (state: RootState) => state.app.subjectList
export const selectIsStudent = (state: RootState) => state.app.isStudent
export const selectCurChatIsClose = (state: RootState) => state.app.curChatIsClose
export const selectId = (state: RootState) => state.app.id

export default counterSlice.reducer
