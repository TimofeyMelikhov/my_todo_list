export interface ITodoListProps {
	title: string
	tasks: ITasks[]
}
export interface ITasks {
	id: number
	title: string
	isDone: boolean
}
