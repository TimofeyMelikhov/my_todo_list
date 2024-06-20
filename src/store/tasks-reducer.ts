import { v1 } from 'uuid'

import { ITaskStateType, ITasks } from 'src/models/models'

type removeTaskActionType = {
	type: 'REMOVE-TASK'
	taskId: string
	todolistId: string
}
type addTaskActionType = {
	type: 'ADD-TASK'
	taskTitle: string
	todolistId: string
}
type changeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	taskId: string
	taskStatus: boolean
	todolistId: string
}

type actionType =
	| removeTaskActionType
	| addTaskActionType
	| changeTaskStatusActionType

export const tasksReducer = (
	state: ITaskStateType,
	action: actionType
): ITaskStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].filter(
					t => t.id !== action.taskId
				)
			}
		case 'ADD-TASK':
			const newTask: ITasks = {
				id: v1(),
				title: action.taskTitle,
				isDone: false
			}
			return {
				...state,
				[action.todolistId]: [newTask, ...state[action.todolistId]]
			}
		case 'CHANGE-TASK-STATUS':
			const updatedTask = state[action.todolistId].map(task => {
				if (task.id === action.taskId) {
					return { ...task, isDone: action.taskStatus }
				}
				return task
			})
			return {
				...state,
				[action.todolistId]: updatedTask
			}
		default:
			return state
	}
}

export const removeTaskAC = (
	taskId: string,
	todolistId: string
): removeTaskActionType => {
	return { type: 'REMOVE-TASK', taskId, todolistId }
}

export const addTaskAC = (
	taskTitle: string,
	todolistId: string
): addTaskActionType => {
	return { type: 'ADD-TASK', taskTitle, todolistId }
}

export const changeTaskStatusAC = (
	taskId: string,
	taskStatus: boolean,
	todolistId: string
): changeTaskStatusActionType => {
	return {
		type: 'CHANGE-TASK-STATUS',
		taskId,
		taskStatus,
		todolistId
	}
}
