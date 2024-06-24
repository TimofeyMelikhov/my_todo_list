import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { ITaskStateType, ITasks } from 'src/models/models'

import { todoListsId1, todoListsId2 } from './todolistSlice'

export interface tasksState {
	tasks: ITaskStateType
}

type removeTaskPayloadType = {
	todoListId: string
	taskId: string
}
type addTaskPayloadType = {
	taskTitle: string
	todolistId: string
}
type changeTaskStatusPayloadType = {
	taskId: string
	taskStatus: boolean
	todolistId: string
}
type changeTaskTitlePayloadType = {
	taskId: string
	taskTitle: string
	todolistId: string
}
type addTodolistPayloadType = {
	todolistId: string
}

const initialState: tasksState = {
	tasks: {
		[todoListsId1]: [
			{
				id: v1(),
				title: 'css & html',
				isDone: true
			},
			{
				id: v1(),
				title: 'js',
				isDone: true
			},
			{
				id: v1(),
				title: 'react',
				isDone: false
			}
		],
		[todoListsId2]: [
			{
				id: v1(),
				title: 'Berserk',
				isDone: true
			},
			{
				id: v1(),
				title: 'КРД',
				isDone: true
			},
			{
				id: v1(),
				title: 'The last of us',
				isDone: false
			}
		]
	}
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		removeTasks: (state, action: PayloadAction<removeTaskPayloadType>) => {
			const { todoListId, taskId } = action.payload
			state.tasks[todoListId] = state.tasks[todoListId].filter(
				t => t.id !== taskId
			)
		},
		addTasks: (state, action: PayloadAction<addTaskPayloadType>) => {
			const { taskTitle, todolistId } = action.payload
			const newTask: ITasks = {
				id: v1(),
				title: taskTitle,
				isDone: false
			}
			state.tasks[todolistId].unshift(newTask)
		},
		changeTaskStatus: (
			state,
			action: PayloadAction<changeTaskStatusPayloadType>
		) => {
			const { taskId, taskStatus, todolistId } = action.payload
			state.tasks[todolistId] = state.tasks[todolistId].map(t =>
				t.id === taskId ? { ...t, isDone: taskStatus } : t
			)
		},
		changeTaskTitle: (
			state,
			action: PayloadAction<changeTaskTitlePayloadType>
		) => {
			const { taskId, taskTitle, todolistId } = action.payload
			state.tasks[todolistId] = state.tasks[todolistId].map(t =>
				t.id === taskId ? { ...t, title: taskTitle } : t
			)
		},
		addTodolist: {
			reducer: (state, action: PayloadAction<addTodolistPayloadType>) => {
				state.tasks[action.payload.todolistId] = []
			},
			prepare: (todolistId: string) => {
				return {
					payload: {
						todolistId
					}
				}
			}
		},
		removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
			delete state.tasks[action.payload.todolistId]
		}
	}
})

export const {
	removeTasks,
	addTasks,
	changeTaskStatus,
	changeTaskTitle,
	addTodolist,
	removeTodolist
} = tasksSlice.actions

export default tasksSlice.reducer
