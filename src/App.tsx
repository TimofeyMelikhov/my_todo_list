import { useState } from 'react'
import 'src/app.css'
import { FilterValuesType, ITasks } from 'src/models/models'
import { v1 } from 'uuid'

import { TodoList } from 'src/components/todoList/TodoList'

function App() {
	const [tasks, setTasks] = useState<ITasks[]>([
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
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForTodoList = tasks

	switch (filter) {
		case 'completed':
			tasksForTodoList = tasks.filter(t => t.isDone === true)
			break
		case 'active':
			tasksForTodoList = tasks.filter(t => t.isDone === false)
			break
	}

	// const tasks2: ITasks[] = [
	// 	{
	// 		id: 1,
	// 		title: 'Пацаны',
	// 		isDone: true
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'КРД',
	// 		isDone: true
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Одни из нас',
	// 		isDone: false
	// 	}
	// ]
	// const tasks3: ITasks[] = [
	// 	{
	// 		id: 1,
	// 		title: 'Hearthstone',
	// 		isDone: true
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Fallout',
	// 		isDone: true
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Dota',
	// 		isDone: false
	// 	}
	// ]

	const addTask = (title: string) => {
		let newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTasksArr = [newTask, ...tasks]
		setTasks(newTasksArr)
	}

	const removeTask = (id: string) => {
		let result = tasks.filter(task => task.id !== id)
		setTasks(result)
	}
	const changeFilter = (value: FilterValuesType) => {
		setFilter(value)
	}

	const changeTaskStatus = (taskId: string, isDone: boolean) => {
		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
		}
		setTasks([...tasks])
	}

	return (
		<div className='container'>
			<TodoList
				title='What to learn'
				tasks={tasksForTodoList}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
			/>
			{/* <TodoList title='Movies' tasks={tasks2} />
			<TodoList title='Game' tasks={tasks3} /> */}
		</div>
	)
}

export default App
