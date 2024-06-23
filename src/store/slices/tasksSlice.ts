import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { ITaskStateType } from 'src/models/models'

import { todoListsId1, todoListsId2 } from './todolistSlice'

interface tasksState {
	tasks: ITaskStateType
}

type RemoveTaskPayloadType = {
	todoListId: string
	taskId: string
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
		removeTasks: (state, action: PayloadAction<RemoveTaskPayloadType>) => {
			const { todoListId, taskId } = action.payload
			state.tasks[todoListId] = state.tasks[todoListId].filter(
				t => t.id !== taskId
			)
		}
	}
})

export default tasksSlice.reducer
