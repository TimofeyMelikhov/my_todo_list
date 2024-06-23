import { configureStore } from '@reduxjs/toolkit'

import tasksReducer from './slices/tasksSlice'
import todolistsReducer from './slices/todolistSlice'

export const store = configureStore({
	reducer: {
		todolists: todolistsReducer,
		tasks: tasksReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
