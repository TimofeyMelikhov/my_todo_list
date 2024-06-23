import { ITaskStateType, ITodoListType } from 'src/models/models'

import { tasksReducer } from './tasks-reducer'
import { addTodolistAC, todolistsReducer } from './todolistsReducer'

test('ids should be equals', () => {
	const startState: ITaskStateType = {}
	const startTodolistsState: ITodoListType[] = []

	const action = addTodolistAC('new todolist')

	const endTasksState = tasksReducer(startState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.todolistId)
	expect(idFromTodolists).toBe(action.todolistId)
})
