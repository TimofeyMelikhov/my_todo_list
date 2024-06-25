export interface ITodoListProps {
	id: string
	title: string
	filter: FilterValuesType
	changeFilter: (value: FilterValuesType, todoListId: string) => void
	ChangeTodoTitle: (newValue: string, todoListId: string) => void
	removeTodoList: (todolistId: string) => void
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

export interface ITaskComponentType {
	taskId: string
	todolistId: string
	isDone: boolean
	title: string
}

export type FilterValuesType = 'all' | 'completed' | 'active'
