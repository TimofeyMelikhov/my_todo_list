import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ITodoListProps } from 'src/models/models'

import 'src/components/todoList/todoList.css'

export const TodoList = ({
	title,
	tasks,
	removeTask,
	changeFilter,
	addTask,
	changeTaskStatus
}: ITodoListProps) => {
	const [newTaskTitle, setNewTitleTask] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	const createTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitleTask(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (newTaskTitle.trim() === '') {
			return
		}
		if (e.key === 'Enter') {
			addTask(newTaskTitle.trim())
			setNewTitleTask('')
		}
	}

	const addNewTask = () => {
		if (newTaskTitle.trim() === '') {
			setError('Title is required')
			return
		}
		addTask(newTaskTitle.trim())
		setNewTitleTask('')
		setError(null)
	}

	return (
		<div className='todoList'>
			<h3>{title}</h3>
			<div>
				<input
					className={error ? 'error' : ''}
					type='text'
					value={newTaskTitle}
					onChange={createTitleTaskHandler}
					onKeyDown={onKeyPressHandler}
				/>
				<button onClick={addNewTask}>+</button>
				{error && <div className='error-message'>Title is required!</div>}
			</div>

			<ul>
				{tasks?.map(item => {
					const removeTaskHandler = () => {
						removeTask(item.id)
					}

					const isDoneChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						changeTaskStatus(item.id, e.currentTarget.checked)
					}

					return (
						<li key={item.id}>
							<input
								type='checkbox'
								checked={item.isDone}
								onChange={isDoneChangeHandler}
							/>
							<span>{item.title}</span>
							<button onClick={removeTaskHandler}>x</button>
						</li>
					)
				})}
			</ul>
			<div className='filterBlock'>
				<button onClick={() => changeFilter('all')}>All</button>
				<button onClick={() => changeFilter('active')}>Active</button>
				<button onClick={() => changeFilter('completed')}>Completed</button>
			</div>
		</div>
	)
}
