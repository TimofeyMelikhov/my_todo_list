import { v1 } from 'uuid'

import { FilterValuesType, ITodoListType } from 'src/models/models'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}
type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}
type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValuesType
}
type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export const todolistsReducer = (
	state: ITodoListType[],
	action: ActionType
): ITodoListType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.id)
		case 'ADD-TODOLIST':
			return [
				{
					id: action.todolistId,
					title: action.title,
					filter: 'all'
				},
				...state
			]
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(tl =>
				tl.id === action.id ? { ...tl, title: action.title } : tl
			)
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(tl =>
				tl.id === action.id ? { ...tl, filter: action.filter } : tl
			)
		default:
			return state
	}
}

export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title, todolistId: v1() }
}
export const changeTodolistTitleAC = (
	title: string,
	id: string
): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title, id }
}
export const changeTodolistFilterAC = (
	filter: FilterValuesType,
	id: string
): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter, id }
}
