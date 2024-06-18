import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { AddCircleOutline } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'

import { IAddItemFormType } from 'src/models/models'

export const AddItemForm = ({ addItem }: IAddItemFormType) => {
	const [newTaskTitle, setNewTitleTask] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	const createTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitleTask(e.currentTarget.value)
		setError(null)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (newTaskTitle.trim() === '') {
			setError('Title is required')
			return
		}
		if (e.key === 'Enter') {
			addItem(newTaskTitle.trim())
			setNewTitleTask('')
		}
	}

	const addNewTask = () => {
		if (newTaskTitle.trim() === '') {
			setError('Title is required')
			return
		}
		addItem(newTaskTitle.trim())
		setNewTitleTask('')
		setError(null)
	}

	return (
		<div>
			<TextField
				label='Введите текст'
				variant='standard'
				error={!!error}
				type='text'
				value={newTaskTitle}
				onChange={createTitleTaskHandler}
				onKeyDown={onKeyPressHandler}
				helperText={error}
			/>
			<IconButton color='primary' onClick={addNewTask}>
				<AddCircleOutline />
			</IconButton>
		</div>
	)
}
