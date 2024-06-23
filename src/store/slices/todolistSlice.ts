import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { FilterValuesType, ITodoListType } from 'src/models/models'

export interface TodolistsState {
	todolists: ITodoListType[]
}

type AddTodolistPayloadType = {
	title: string
	todolistId: string
}

type ChangeTodolistTitlePayloadType = {
	id: string
	title: string
}

type ChangeTodolistFilterPayloadType = {
	id: string
	filter: FilterValuesType
}

export const todoListsId1 = v1()
export const todoListsId2 = v1()

const initialState: TodolistsState = {
	todolists: [
		{
			id: todoListsId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todoListsId2,
			title: 'What to watch',
			filter: 'all'
		}
	]
}

export const todolistsSlice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		removeTodolist: (state, action: PayloadAction<string>) => {
			state.todolists = state.todolists.filter(td => td.id !== action.payload)
		},
		addTodolist: {
			reducer: (state, action: PayloadAction<AddTodolistPayloadType>) => {
				const newTodolist: ITodoListType = {
					id: action.payload.todolistId,
					title: action.payload.title,
					filter: 'all'
				}
				state.todolists.unshift(newTodolist)
			},
			prepare: (title: string) => {
				return {
					payload: { todolistId: v1(), title }
				}
			}
		},
		changeTodolistTitle: (
			state,
			action: PayloadAction<ChangeTodolistTitlePayloadType>
		) => {
			state.todolists = state.todolists.map(tl =>
				tl.id === action.payload.id
					? { ...tl, title: action.payload.title }
					: tl
			)
		},
		changeTodolistFilter: (
			state,
			action: PayloadAction<ChangeTodolistFilterPayloadType>
		) => {
			state.todolists = state.todolists.map(tl =>
				tl.id === action.payload.id
					? { ...tl, filter: action.payload.filter }
					: tl
			)
		}
	}
})

export const {
	removeTodolist,
	addTodolist,
	changeTodolistFilter,
	changeTodolistTitle
} = todolistsSlice.actions

export default todolistsSlice.reducer
