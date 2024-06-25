import tasksSlice, {
	addTodolist as addTaskTodolist,
	addTasks,
	changeTaskStatus,
	changeTaskTitle,
	removeTasks,
	removeTodolist,
	tasksState
} from './tasksSlice'
import { addTodolist as addTodoTodolist } from './todolistSlice'

test('correct task should be deleted from correct array', () => {
	const startState: tasksState = {
		tasks: {
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
	}

	const endState = tasksSlice(
		startState,
		removeTasks({ taskId: '2', todoListId: 'todolistsId2' })
	)

	expect(endState.tasks['todolistsId1'].length).toBe(3)
	expect(endState.tasks['todolistsId2'].length).toBe(2)
	expect(endState.tasks['todolistsId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const startState: tasksState = {
		tasks: {
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
	}

	const endState = tasksSlice(
		startState,
		addTasks({ title: 'the boys', id: 'todolistsId2' })
	)

	expect(endState.tasks['todolistsId1'].length).toBe(3)
	expect(endState.tasks['todolistsId2'].length).toBe(4)
	expect(endState.tasks['todolistsId2'][0].id).toBeDefined()
	expect(endState.tasks['todolistsId2'][0].title).toBe('the boys')
	expect(endState.tasks['todolistsId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const startState: tasksState = {
		tasks: {
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
	}
	const endState = tasksSlice(
		startState,
		changeTaskStatus({
			taskId: '2',
			taskStatus: false,
			todolistId: 'todolistsId2'
		})
	)

	expect(endState.tasks['todolistsId2'][1].isDone).toBeFalsy()
	expect(endState.tasks['todolistsId1'][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
	const startState: tasksState = {
		tasks: {
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
	}

	const endState = tasksSlice(
		startState,
		changeTaskTitle({
			taskId: '2',
			taskTitle: 'the boys',
			todolistId: 'todolistsId2'
		})
	)

	expect(endState.tasks['todolistsId2'][1].title).toBe('the boys')
	expect(endState.tasks['todolistsId1'][1].title).toBe('js')
})

test('new property with new array should be added when new todolist is added', () => {
	const startState: tasksState = {
		tasks: {
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
	}
	const action = addTodoTodolist('new todolist')
	const endState = tasksSlice(
		startState,
		addTaskTodolist(action.payload.todolistId)
	)

	const keys = Object.keys(endState.tasks)

	const newKey = keys.find(k => k === action.payload.todolistId)

	if (!newKey) {
		throw new Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState.tasks[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
	const startState: tasksState = {
		tasks: {
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
	}
	const endState = tasksSlice(
		startState,
		removeTodolist({ todolistId: 'todolistsId2' })
	)

	const keys = Object.keys(endState.tasks)

	expect(keys.length).toBe(1)
	expect(endState.tasks['todolistsId2']).toBeUndefined()
})
