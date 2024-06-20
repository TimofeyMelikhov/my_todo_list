import { ITaskStateType } from 'src/models/models'

import {
	addTaskAC,
	changeTaskStatusAC,
	removeTaskAC,
	tasksReducer
} from './tasks-reducer'

test('correct task should be deleted from correct array', () => {
	const startState: ITaskStateType = {
		todolistsId1: [
			{
				id: '1',
				title: 'css & html',
				isDone: true
			},
			{
				id: '2',
				title: 'js',
				isDone: true
			},
			{
				id: '3',
				title: 'react',
				isDone: false
			}
		],
		todolistsId2: [
			{
				id: '1',
				title: 'Berserk',
				isDone: true
			},
			{
				id: '2',
				title: 'КРД',
				isDone: true
			},
			{
				id: '3',
				title: 'The last of us',
				isDone: false
			}
		]
	}

	const endState = tasksReducer(startState, removeTaskAC('2', 'todolistsId2'))

	expect(endState['todolistsId1'].length).toBe(3)
	expect(endState['todolistsId2'].length).toBe(2)
	expect(endState['todolistsId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const startState: ITaskStateType = {
		todolistsId1: [
			{
				id: '1',
				title: 'css & html',
				isDone: true
			},
			{
				id: '2',
				title: 'js',
				isDone: true
			},
			{
				id: '3',
				title: 'react',
				isDone: false
			}
		],
		todolistsId2: [
			{
				id: '1',
				title: 'Berserk',
				isDone: true
			},
			{
				id: '2',
				title: 'КРД',
				isDone: true
			},
			{
				id: '3',
				title: 'The last of us',
				isDone: false
			}
		]
	}

	const endState = tasksReducer(
		startState,
		addTaskAC('the boys', 'todolistsId2')
	)

	expect(endState['todolistsId1'].length).toBe(3)
	expect(endState['todolistsId2'].length).toBe(4)
	expect(endState['todolistsId2'][0].id).toBeDefined()
	expect(endState['todolistsId2'][0].title).toBe('the boys')
	expect(endState['todolistsId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const startState: ITaskStateType = {
		todolistsId1: [
			{
				id: '1',
				title: 'css & html',
				isDone: true
			},
			{
				id: '2',
				title: 'js',
				isDone: true
			},
			{
				id: '3',
				title: 'react',
				isDone: false
			}
		],
		todolistsId2: [
			{
				id: '1',
				title: 'Berserk',
				isDone: true
			},
			{
				id: '2',
				title: 'КРД',
				isDone: true
			},
			{
				id: '3',
				title: 'The last of us',
				isDone: false
			}
		]
	}

	const endState = tasksReducer(
		startState,
		changeTaskStatusAC('2', false, 'todolistId2')
	)

	expect(endState['todolistsId2'][1].isDone).toBeFalsy()
	expect(endState['todolistsId1'][1].isDone).toBeTruthy()
})
