export interface ITodoListProps {
	title: string
	tasks: ITasks[]
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export interface ITasks {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'completed' | 'active'
