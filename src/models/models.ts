export interface ITodoListProps {
	id: string
	title: string
	tasks: ITasks[]
	filter: FilterValuesType
	removeTask: (id: string, todoListId: string) => void
	changeFilter: (value: FilterValuesType, todoListId: string) => void
	addTask: (title: string, todoListId: string) => void
	changeTaskStatus: (
		taskId: string,
		isDone: boolean,
		todoListId: string
	) => void
	changeTaskTitle: (
		newValue: string,
		taskId: string,
		todoListId: string
	) => void
	ChangeTodoTitle: (newValue: string, todoListId: string) => void
	removeTodoList: (todoListId: string) => void
}

export interface ITasks {
	id: string
	title: string
	isDone: boolean
}

export interface ITodoListType {
	id: string
	title: string
	filter: FilterValuesType
}

export interface ITaskStateType {
	[key: string]: ITasks[]
}

export interface IAddItemFormType {
	addItem: (title: string) => void
}

export interface IEditableSpanType {
	title: string
	onChange: (newValue: string) => void
}

export type FilterValuesType = 'all' | 'completed' | 'active'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
}
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValuesType
}
export type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
