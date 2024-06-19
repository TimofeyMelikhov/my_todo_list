import { v1 } from 'uuid'

import {
	ActionType,
	AddTodolistActionType,
	ChangeTodolistFilterActionType,
	ChangeTodolistTitleActionType,
	FilterValuesType,
	ITodoListType,
	RemoveTodolistActionType
} from 'src/models/models'

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

export const RemoveTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title }
}
export const ChangeTodolistTitleAC = (
	title: string,
	id: string
): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title, id }
}
export const ChangeTodolistFilterAC = (
	filter: FilterValuesType,
	id: string
): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter, id }
}
