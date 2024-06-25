import { memo, useCallback } from 'react'

import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { addTasks } from 'src/store/slices/tasksSlice'

import { ITodoListProps } from 'src/models/models'

import 'src/components/todoList/todoList.css'

import { AddItemForm } from '../addItemForm/AddItemForm'
import { EditableSpan } from '../editableSpan/EditableSpan'
import { Task } from '../tasks/Task'

export const TodoList = memo(
	({
		id,
		title,
		filter,
		changeFilter,
		removeTodoList,
		ChangeTodoTitle
	}: ITodoListProps) => {
		console.log('TodoList is called')
		const dispatch = useAppDispatch()
		const tasks = useAppSelector(state => state.tasks.tasks[id])

		const addTaskHandler = useCallback(
			(title: string) => {
				dispatch(addTasks({ title, id }))
			},
			[dispatch, id]
		)

		const removeTodoListHandler = () => {
			removeTodoList(id)
		}

		const changeTodoTitleHandler = useCallback(
			(newValue: string) => {
				ChangeTodoTitle(newValue, id)
			},
			[id, ChangeTodoTitle]
		)

		const onAllClickHandler = useCallback(
			() => changeFilter('all', id),
			[changeFilter, id]
		)
		const onActiveClickHandler = useCallback(
			() => changeFilter('active', id),
			[changeFilter, id]
		)
		const onCompletedClickHandler = useCallback(
			() => changeFilter('completed', id),
			[changeFilter, id]
		)

		let tasksForTodoList = tasks

		switch (filter) {
			case 'completed':
				tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
				break
			case 'active':
				tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
				break
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
				{tasksForTodoList.map(t => {
					return (
						<Task
							key={t.id}
							taskId={t.id}
							isDone={t.isDone}
							title={t.title}
							todolistId={id}
						/>
					)
				})}
				<div className='filterBlock'>
					<Button
						variant={filter === 'all' ? 'contained' : 'text'}
						onClick={onAllClickHandler}
					>
						All
					</Button>
					<Button
						color='primary'
						variant={filter === 'active' ? 'contained' : 'text'}
						onClick={onActiveClickHandler}
					>
						Active
					</Button>
					<Button
						color='secondary'
						variant={filter === 'completed' ? 'contained' : 'text'}
						onClick={onCompletedClickHandler}
					>
						Completed
					</Button>
				</div>
			</div>
		)
	}
)
