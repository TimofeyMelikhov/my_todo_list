import { v1 } from 'uuid'

import { FilterValuesType, ITodoListType } from 'src/models/models'

import {
	addTodolistAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from './todolistsReducer'

test('correct todolist should be removed', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const startState: ITodoListType[] = [
		{
			id: todolist1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolist2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(startState, removeTodolistAC(todolist1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolist2)
})

test('correct todolist should be added', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const newTodolistTitle = 'New Todolist'

	const startState: ITodoListType[] = [
		{
			id: todolist1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolist2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
	expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const newTodolistTitle = 'New Todolist'

	const startState: ITodoListType[] = [
		{
			id: todolist1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolist2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(
		startState,
		changeTodolistTitleAC(newTodolistTitle, todolist2)
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its filter', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const newFilter: FilterValuesType = 'completed'

	const startState: ITodoListType[] = [
		{
			id: todolist1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todolist2,
			title: 'What to watch',
			filter: 'all'
		}
	]

	const endState = todolistsReducer(startState, {
		type: 'CHANGE-TODOLIST-FILTER',
		id: todolist2,
		filter: newFilter
	})

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
