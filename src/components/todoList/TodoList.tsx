import { ChangeEvent } from 'react'

import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'

import { ITodoListProps } from 'src/models/models'

import 'src/components/todoList/todoList.css'

import { AddItemForm } from '../addItemForm/AddItemForm'
import { EditableSpan } from '../editableSpan/EditableSpan'

export const TodoList = ({
	id,
	title,
	tasks,
	filter,
	removeTask,
	changeFilter,
	addTask,
	changeTaskStatus,
	removeTodoList,
	changeTaskTitle,
	ChangeTodoTitle
}: ITodoListProps) => {
	const removeTodoListHandler = () => {
		removeTodoList(id)
	}

	const addTaskHandler = (title: string) => {
		addTask(title, id)
	}

	const changeTodoTitleHandler = (newValue: string) => {
		ChangeTodoTitle(newValue, id)
	}

	return (
		<div className='todoList'>
			<h3>
				<EditableSpan title={title} onChange={changeTodoTitleHandler} />
				<IconButton aria-label='delete' onClick={removeTodoListHandler}>
					<Delete />
				</IconButton>
			</h3>

			<AddItemForm addItem={addTaskHandler} />

			<div>
				{tasks?.map(item => {
					const removeTaskHandler = () => {
						removeTask(item.id, id)
					}

					const isDoneChangeStatusHandler = (
						e: ChangeEvent<HTMLInputElement>
					) => {
						changeTaskStatus(item.id, e.currentTarget.checked, id)
					}

					const changeTitleHandler = (newValue: string) => {
						changeTaskTitle(newValue, item.id, id)
					}

					return (
						<div key={item.id} className={item.isDone ? 'is-done' : ''}>
							<Checkbox
								checked={item.isDone}
								onChange={isDoneChangeStatusHandler}
							/>
							<EditableSpan title={item.title} onChange={changeTitleHandler} />
							<IconButton aria-label='delete' onClick={removeTaskHandler}>
								<Delete />
							</IconButton>
						</div>
					)
				})}
			</div>
			<div className='filterBlock'>
				<Button
					variant={filter === 'all' ? 'contained' : 'text'}
					onClick={() => changeFilter('all', id)}
				>
					All
				</Button>
				<Button
					color='primary'
					variant={filter === 'active' ? 'contained' : 'text'}
					onClick={() => changeFilter('active', id)}
				>
					Active
				</Button>
				<Button
					color='secondary'
					variant={filter === 'completed' ? 'contained' : 'text'}
					onClick={() => changeFilter('completed', id)}
				>
					Completed
				</Button>
			</div>
		</div>
	)
}
