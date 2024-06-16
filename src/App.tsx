import 'src/app.css'
import { ITasks } from 'src/models/models'

import { TodoList } from 'src/components/todoList/TodoList'

function App() {
	const tasks1: ITasks[] = [
		{
			id: 1,
			title: 'css & html',
			isDone: true
		},
		{
			id: 2,
			title: 'js',
			isDone: true
		},
		{
			id: 3,
			title: 'react',
			isDone: false
		}
	]
	const tasks2: ITasks[] = [
		{
			id: 1,
			title: 'Пацаны',
			isDone: true
		},
		{
			id: 2,
			title: 'КРД',
			isDone: true
		},
		{
			id: 3,
			title: 'Одни из нас',
			isDone: false
		}
	]
	const tasks3: ITasks[] = [
		{
			id: 1,
			title: 'Hearthstone',
			isDone: true
		},
		{
			id: 2,
			title: 'Fallout',
			isDone: true
		},
		{
			id: 3,
			title: 'Dota',
			isDone: false
		}
	]

	return (
		<div className='container'>
			<TodoList title='What to learn' tasks={tasks1} />
			<TodoList title='Movies' tasks={tasks2} />
			<TodoList title='Game' tasks={tasks3} />
		</div>
	)
}

export default App
