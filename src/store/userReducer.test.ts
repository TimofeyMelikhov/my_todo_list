import { StateType, userReducer } from './userReducer'

test('user reducer should increment only age', () => {
	const startState: StateType = { age: 20, childrenCount: 2, name: 'Tima' }

	const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

	expect(endState.age).toBe(21)
	expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
	const startState: StateType = { age: 20, childrenCount: 2, name: 'Tima' }

	const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

	expect(endState.childrenCount).toBe(3)
	expect(endState.age).toBe(20)
})

test('user reducer should change name of user', () => {
	const startState: StateType = { age: 20, childrenCount: 2, name: 'Tima' }
	const newName = 'Timofey'
	const endState = userReducer(startState, { type: 'CHANGE-NAME', newName })

	expect(endState.name).toBe(newName)
	expect(endState.age).toBe(20)
})
