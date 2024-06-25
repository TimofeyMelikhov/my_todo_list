import { tasksState } from './tasksSlice'
import tasksSlice, { addTodolist as addTodolistTasks } from './tasksSlice'
import { TodolistsState } from './todolistSlice'
import todolistsSlice, { addTodolist } from './todolistSlice'

test('ids should be equals', () => {
	const startState: tasksState = {
		tasks: {}
	}
	const startTodolistsState: TodolistsState = {
		todolists: []
	}

	const action = addTodolist('new todolist')
	const actionForTasks = addTodolistTasks(action.payload.todolistId)

	const endTasksState = tasksSlice(
		startState,
		addTodolistTasks(actionForTasks.payload.todolistId)
	)
	const endTodolistsState = todolistsSlice(startTodolistsState, action)

	const keys = Object.keys(endTasksState.tasks)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState.todolists[0].id

	expect(idFromTasks).toBe(action.payload.todolistId)
	expect(idFromTodolists).toBe(action.payload.todolistId)
})
