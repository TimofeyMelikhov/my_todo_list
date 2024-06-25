import { v1 } from 'uuid'

import { FilterValuesType } from 'src/models/models'

import todolistsSlice, {
	TodolistsState,
	addTodolist,
	changeTodolistFilter,
	changeTodolistTitle,
	removeTodolist
} from './todolistSlice'

test('correct todolist should be removed', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const startState: TodolistsState = {
		todolists: [
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
	}

	const endState = todolistsSlice(startState, removeTodolist(todolist1))

	expect(endState.todolists.length).toBe(1)
	expect(endState.todolists[0].id).toBe(todolist2)
})

test('correct todolist should be added', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const newTodolistTitle = 'New Todolist'

	const startState: TodolistsState = {
		todolists: [
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
	}

	const endState = todolistsSlice(startState, addTodolist(newTodolistTitle))

	expect(endState.todolists.length).toBe(3)
	expect(endState.todolists[0].title).toBe(newTodolistTitle)
	expect(endState.todolists[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const newTodolistTitle = 'New todolist'

	const startState: TodolistsState = {
		todolists: [
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
	}

	const endState = todolistsSlice(
		startState,
		changeTodolistTitle({ id: todolist2, title: newTodolistTitle })
	)

	expect(endState.todolists[0].title).toBe('What to learn')
	expect(endState.todolists[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its filter', () => {
	let todolist1 = v1()
	let todolist2 = v1()

	const newFilter: FilterValuesType = 'completed'

	const startState: TodolistsState = {
		todolists: [
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
	}

	const endState = todolistsSlice(
		startState,
		changeTodolistFilter({ id: todolist2, filter: newFilter })
	)

	expect(endState.todolists[0].filter).toBe('all')
	expect(endState.todolists[1].filter).toBe(newFilter)
})
