import { v1 } from 'uuid'

import { FilterValuesType, ITodoListType } from 'src/models/models'

type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
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
				...state,
				{
					id: v1(),
					title: action.title,
					filter: 'all'
				}
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
	return { type: 'ADD-TODOLIST', title }
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
