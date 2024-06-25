import { ChangeEvent } from 'react'

import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import { useAppDispatch } from 'src/hooks/redux'
import {
	changeTaskStatus,
	changeTaskTitle,
	removeTasks
} from 'src/store/slices/tasksSlice'

import { ITaskComponentType } from 'src/models/models'

import { EditableSpan } from 'src/components/editableSpan/EditableSpan'

export const Task = ({
	taskId,
	todolistId,
	isDone,
	title
}: ITaskComponentType) => {
	const dispatch = useAppDispatch()

	const removeTaskHandler = () => {
		dispatch(removeTasks({ taskId, todolistId }))
	}

	const isDoneChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			changeTaskStatus({
				taskId,
				taskStatus: e.currentTarget.checked,
				todolistId
			})
		)
	}

	const changeTitleHandler = (newValue: string) => {
		dispatch(
			changeTaskTitle({
				taskId,
				taskTitle: newValue,
				todolistId
			})
		)
	}

	return (
		<div className={isDone ? 'is-done' : ''}>
			<Checkbox checked={isDone} onChange={isDoneChangeStatusHandler} />
			<EditableSpan title={title} onChange={changeTitleHandler} />
			<IconButton aria-label='delete' onClick={removeTaskHandler}>
				<Delete />
			</IconButton>
		</div>
	)
}
